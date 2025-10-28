from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time  # 👈 Cần import time để lấy timestamp chính xác
import speech_recognition as sr
import wave
import re # Import module re để làm sạch văn bản

app = Flask(__name__)
CORS(app)

# 📂 Cấu hình thư mục tải lên
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Hàm làm sạch và chuẩn hóa văn bản
def clean_text(text):
    """Xóa dấu câu và chuẩn hóa về chữ thường."""
    text = text.lower()
    # Loại bỏ các ký tự không phải chữ cái hoặc số (trừ khoảng trắng)
    text = re.sub(r'[^\w\s]', '', text)
    return text

@app.route("/api/speaking", methods=["POST"])
def speaking_check():
    # Khởi tạo filepath ngoài khối try để khối finally có thể truy cập
    filepath = None
    filename = None
    
    try:
        # 🧩 Kiểm tra file audio gửi lên
        if "audio" not in request.files:
            return jsonify({"error": "Không có file audio gửi lên!"}), 400

        audio = request.files["audio"]
        
        # Lấy câu tham chiếu (reference)
        # SỬA: Không gọi .lower().strip() ngay để giữ nguyên văn bản gốc
        reference = request.form.get("reference", "").strip()
        
        # 🕒 SỬA: Tạo tên file duy nhất theo timestamp (mili giây)
        timestamp_ms = int(time.time() * 1000)
        filename = f"record_{timestamp_ms}.wav"
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        
        # 💾 Lưu file
        audio.save(filepath)

        print(f"📥 Đã nhận file: {filename}")
        
        # ✅ Kiểm tra xem file có đúng định dạng WAV không
        try:
            with wave.open(filepath, "rb") as wf:
                if wf.getnchannels() == 0:
                    raise ValueError("File âm thanh rỗng hoặc hỏng!")
        except wave.Error as e:
            # Lỗi wave.Error sẽ bị bắt và trả về 400
            return jsonify({"error": f"File không phải WAV hợp lệ: {e}"}), 400

        # 🎧 Dùng SpeechRecognition để nhận dạng giọng nói
        recognizer = sr.Recognizer()
        with sr.AudioFile(filepath) as source:
            # Giới hạn thời gian chờ để tránh treo lâu
            recognizer.pause_threshold = 0.5 
            audio_data = recognizer.record(source)
            # Ngôn ngữ tiếng Anh (en-US)
            transcript = recognizer.recognize_google(audio_data, language="en-US")

        print(f"🗣 Văn bản nhận dạng: {transcript}")

        # 💬 SỬA LOGIC SO SÁNH (Logic đánh giá chính xác hơn)
        if not reference:
            result = "Không có câu chuẩn để so sánh."
            score = 0
        else:
            # Chuẩn hóa cả hai chuỗi để so sánh
            cleaned_reference = clean_text(reference)
            cleaned_transcript = clean_text(transcript)

            ref_words = cleaned_reference.split()
            user_words = cleaned_transcript.split()
            
            # --- Tính toán điểm dựa trên sự khớp từ (Word Match Scoring) ---
            
            # 1. Tạo bản sao của danh sách từ chuẩn để theo dõi từ nào đã khớp
            ref_pool = list(ref_words)
            matched_count = 0
            
            # 2. Lặp qua từ của người dùng và cố gắng khớp với từ chuẩn
            for u_word in user_words:
                try:
                    # Tìm từ khớp đầu tiên trong pool
                    idx = ref_pool.index(u_word)
                    # Nếu khớp, tăng điểm và loại bỏ từ đó khỏi pool để không khớp lại
                    matched_count += 1
                    ref_pool.pop(idx)
                except ValueError:
                    # Từ của người dùng không có trong từ chuẩn (Từ thừa)
                    pass 

            total_ref_words = len(ref_words)
            
            # Tính điểm (tỷ lệ từ khớp trên tổng số từ chuẩn, nhân 10)
            if total_ref_words > 0:
                score = round(matched_count / total_ref_words * 10, 2)
            else:
                 score = 0
            
            result = f"Số từ khớp: {matched_count}/{total_ref_words} từ chuẩn."
            
            if matched_count < total_ref_words:
                missed_words = ", ".join(ref_pool)
                result += f" (Thiếu: {missed_words})"

        # 📤 CẬP NHẬT: Trả về cả câu chuẩn (reference) và văn bản nhận dạng (transcript)
        return jsonify({
            "reference_text": reference, # Văn bản gốc của đề bài
            "transcript": transcript,    # Văn bản nhận dạng từ giọng nói người dùng
            "result": result,
            "score": score
        }), 200

    except sr.UnknownValueError:
        # Lỗi khi Google Speech Recognition không nghe thấy gì
        return jsonify({"error": "Không thể nhận dạng giọng nói, hãy thử lại!"}), 400
    except Exception as e:
        # Xử lý các lỗi khác (lỗi I/O, lỗi mạng, v.v.)
        print(f"❌ Lỗi tổng quát: {e}")
        return jsonify({"error": f"Lỗi server: {e}"}), 500
        
    finally:
        # 🧹 Bắt buộc xóa file tạm thời, dù có lỗi xảy ra hay không
        if filepath and os.path.exists(filepath):
            os.remove(filepath)
            print(f"🧹 Đã xóa file tạm thời: {filename}")

@app.route("/api/writing", methods=["POST"])
def writing_check():
    try:
        # 🧠 Nhận bài viết của thí sinh
        user_text = request.form.get("answer", "").strip()
        topic = request.form.get("topic", "").strip()

        if not user_text:
            return jsonify({"error": "Không có nội dung gửi lên!"}), 400

        # 📘 Đọc bài mẫu (sample)
        sample_path = os.path.join("samples", f"{topic}.txt")
        if not os.path.exists(sample_path):
            return jsonify({"error": f"Không tìm thấy sample cho chủ đề '{topic}'!"}), 404

        with open(sample_path, "r", encoding="utf-8") as f:
            sample_text = f.read().strip()
            reference = sample_text

        # 🧹 Làm sạch text
        def clean_text(t):
            import re
            t = t.lower()
            t = re.sub(r"[^\w\s]", "", t)
            return t

        cleaned_user = clean_text(user_text)
        cleaned_sample = clean_text(sample_text)

        # So sánh theo từ
        user_words = cleaned_user.split()
        sample_words = cleaned_sample.split()

        matched = sum(1 for w in user_words if w in sample_words)
        score = round(matched / len(sample_words) * 10, 2)

        import random
        if score >= 9:
            feedbacks = [
                "🌟 Gần như hoàn hảo rồi! Bài viết của bạn rất tự nhiên và chính xác.",
                "🔥 Xuất sắc! Bạn thể hiện vốn từ và cấu trúc cực kỳ tốt.",
                "💎 Một bài viết tuyệt vời — giữ phong độ này nhé!"
            ]
        elif score >= 7:
            feedbacks = [
                "💪 Bài viết khá tốt, chỉ cần chỉnh một vài lỗi nhỏ là hoàn hảo.",
                "✨ Rất ổn! Cố gắng trau chuốt thêm về ngữ pháp nhé.",
                "📚 Tốt lắm, diễn đạt rõ ràng, nên mở rộng thêm vốn từ."
            ]
        elif score >= 5:
            feedbacks = [
                "📝 Cũng tạm ổn, nhưng còn khá nhiều điểm cần cải thiện.",
                "🤔 Cố gắng thêm chút nữa, bạn đang đi đúng hướng.",
                "📖 Có ý tưởng nhưng cần viết mạch lạc hơn nhé."
            ]
        else:
            feedbacks = [
                "💡 Bài viết còn yếu, thử đọc lại bài mẫu và luyện thêm.",
                "⚡ Chưa đạt yêu cầu, nhưng đừng nản — tập trung vào ngữ pháp cơ bản.",
                "🌱 Mới bắt đầu thôi, hãy luyện thêm để tiến bộ nhanh nhé!"
            ]
        missed_words = [w for w in sample_words if w not in user_words]

        message = random.choice(feedbacks)
        result = f"Độ tương đồng: {score}/10\n {message}"

        if missed_words:
            result += f"\n Nên dùng thêm các từ hay: {', '.join(missed_words)}"

        return jsonify({
            "reference_text": reference,
            "user_text": user_text,
            "score": score,
            "result": result,
            "missed_words": missed_words,
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Chạy ứng dụng trên host và port mặc định
    app.run(host="0.0.0.0", port=5000, debug=True)
