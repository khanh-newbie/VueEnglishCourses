<template>
  <footer class="bg-[#07403F] text-white text-sm py-10 px-4 lg:px-0 font-averta-regular">
    <div class="container mx-auto space-y-8">

      <!-- Links & Fanpage -->
      <div class="flex flex-col md:flex-row md:justify-between border-b border-gray-600 pb-6 gap-6">

        <!-- Column 1: About -->
        <div class="flex-1 md:mr-4 mt-5 md:mt-0">
          <div class="text-base font-bold border-b pb-2.5 mb-2.5">Về EnglishCenter </div>
        </div>

        <!-- Column 2: Fanpage -->
        <div class="flex-1 md:mr-4 mt-5 md:mt-0">
          <div class="text-base font-bold border-b pb-2.5 mb-2.5">Fanpage</div>
          <div class="flex justify-between">
            <div class="flex flex-col space-y-1.5">
              <a href="https://www.facebook.com/profile.php?id=100080073926941" target="_blank" class="no-underline">EnglishCenter</a>
            </div>
            <div class="flex flex-col space-y-1.5">
              <a href="https://www.facebook.com/HbDiepp.24" target="_blank" class="no-underline">Hoàng Bích Diệp</a>
            </div>
          </div>
        </div>

        <!-- Column 3: Social -->
        <div class="flex-1 mt-5 md:mt-0">
          <div class="text-base font-bold border-b border-gray-500 pb-2.5 mb-2.5">Social</div>
          <div class="flex flex-wrap gap-2">
            <a href="https://www.facebook.com/HbDiepp.24" target="_blank"><img src="/src/assets/images/fb_footer.png" class="w-9 h-9"/></a>
            <a href="https://www.instagram.com/apr.peidbh/" target="_blank"><img src="/src/assets/images/ins.png" class="w-9 h-9"/></a>
            <a href="https://www.youtube.com/@nhatkhanh7793" target="_blank"><img src="/src/assets/images/yt_footer.png" class="w-9 h-9"/></a>
            <a href="https://zalo.me/0333589124" target="_blank"><img src="/src/assets/images/zalo.png" class="w-9 h-9"/></a>
          </div>
        </div>

      </div>

      <!-- Address & Contact -->
      <div class="flex flex-col md:flex-row md:justify-between border-b border-gray-600 pb-6 gap-6 text-sm">
        <div class="flex-1 space-y-1">
          <p><strong>Trụ sở:</strong> Hà Nội</p>
          <p><strong>Hotline:</strong> (+84) ... </p>
        </div>
        <div class="flex-1 space-y-1">
          <p><strong>Cơ sở 2:</strong> Đà Nẵng</p>
          <p><strong>Hotline:</strong> (+84) ... </p>
        </div>
        <div class="flex-1 space-y-1">
          <p><strong>Cơ sở 3:</strong> Hồ Chí Minh</p>
          <p><strong>Hotline:</strong> (+84) ... </p>
        </div>
        <div class="flex-1 space-y-1">
          <p><strong>Cơ sở 4:</strong> America</p>
          <p><strong>Hotline:</strong> Số Mỹ </p>
        </div>
      </div>

      <!-- Hours & Copyright -->
      <div class="flex flex-col md:flex-row md:justify-between pt-6 gap-4 text-xs">
        <div class="flex flex-col md:flex-row gap-4">
          <span>Thứ 2-6: 8h30 - 17h30</span>
          <span>Thứ 7: 9h00 - 11h00</span>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <span>Email: cskh@englishcenter.com</span>
          <span>Online: +84 333589124</span>
        </div>
        <div class="flex items-center gap-2 mt-2 md:mt-0">
          <span>© 2025 EnglishCenter - Mã số thuế 0002042004</span>
          <a href="#" target="_blank"><img src="/src/assets/images/bocongthuong.png" class="h-16"/></a>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>

a {
  text-decoration: none;
  color: aliceblue;
  transition: all 0.3s;
}

a:hover {
  color: #10bd8f; 
}
</style>
