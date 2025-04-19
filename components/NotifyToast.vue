<script lang=ts setup>
</script>

<template>
  <Toast position="bottom-left" group="headless">
    <template #container="{ message }">
      <div flex items-center gap-4 p-2 px-4 class="bg-white/70" rounded-2xl>
        <div
          p-3 rounded-full outline
          :class="message.detail === 'Návstěvník' ? 'outline-orange-500' : 'outline-green-500'"
        >
          <i
            :class="message.detail === 'Návstěvník' ? 'pi-shop  text-orange-500' : 'pi-cart-plus  text-green-500'"
            class="pi  text-3xl"
          />
        </div>

        <section class="flex flex-col w-full  ">
          <div
            :class="message.detail === 'Návstěvník' ? 'text-orange-500' : 'text-green-600'"
            class="text-base  font-500 mb-0"
          >
            <span>
              {{ message.detail }}
            </span>
            <span text-base mb-0 font-500> {{
              message.detail === 'Návstěvník'
                ? ' z České republiky'
                : ' z Česka'
            }} </span>
          </div>
          <div text-gray-500 flex gap-1 flex-col>
            <span text-0.9rem text="black/80">
              {{
                message.detail === 'Návstěvník'
                  ? 'si právě procházi stránku'
                  : 'má dokončenou objednávku'
              }}

            </span>
            <span text-0.9rem flex items-center gap-2>
              {{ message.summary }}
              <span underline>
                <i class="pi pi-star-fill text-yellow-500 text-xs " />
                ověřeno
              </span>
            </span>
          </div>
        </section>
      </div>
    </template>
  </Toast>
</template>
