<template>
  <footer class="bg-[#07403F] text-white text-sm py-10 px-4 lg:px-0 font-averta-regular">
    <div class="container mx-auto space-y-8">

      <!-- Links & Fanpage -->
      <div class="flex flex-col md:flex-row md:justify-between border-b border-gray-600 pb-6 gap-6">

        <!-- Column 1: About -->
        <div class="flex-1 md:mr-4 mt-5 md:mt-0">
          <div class="text-base font-bold border-b pb-2.5 mb-2.5">{{ $t('aboutUs') }}</div>
        </div>

        <!-- Column 2: Fanpage -->
        <div class="flex-1 md:mr-4 mt-5 md:mt-0">
          <div class="text-base font-bold border-b pb-2.5 mb-2.5">{{ $t('fanpage') }}</div>
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
          <div class="text-base font-bold border-b border-gray-500 pb-2.5 mb-2.5">{{ $t('social') }}</div>
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
          <p><strong>{{ $t('headOffice') }}:</strong> {{ $t('headOfficeAddress') }}</p>
          <p><strong>{{ $t('headOfficeHotline') }}:</strong> (+84) ... </p>
        </div>
        <div class="flex-1 space-y-1">
          <p><strong>{{ $t('branch2') }}:</strong>{{ $t('branch2Address') }}</p>
          <p><strong>{{ $t('headOfficeHotline') }}:</strong> (+84) ... </p>
        </div>
        <div class="flex-1 space-y-1">
          <p><strong>{{ $t('branch3') }}:</strong> {{ $t('branch3Address') }}</p>
          <p><strong>{{ $t('headOfficeHotline') }}:</strong> (+84) ... </p>
        </div>
        <div class="flex-1 space-y-1">
          <p><strong>{{ $t('branch4') }}:</strong> {{ $t('branch4Address') }} </p>
          <p><strong>{{ $t('headOfficeHotline') }}:</strong> Số Mỹ </p>
        </div>
      </div>

      <!-- Hours & Copyright -->
      <div class="flex flex-col md:flex-row md:justify-between pt-6 gap-4 text-xs">
        <div class="flex flex-col md:flex-row gap-4">
          <span>{{ $t('weekdayHours') }}</span>
          <span>{{ $t('saturdayHours') }}</span>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <span>{{ $t('email') }}</span>
          <span>{{ $t('online') }}</span>
        </div>
        <div class="flex items-center gap-2 mt-2 md:mt-0">
          <span>{{ $t('copyright') }}</span>
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
