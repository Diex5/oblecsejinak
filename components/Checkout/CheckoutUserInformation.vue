<script setup lang=ts>
/* defineProps<{

}>() */

const checked2 = ref(true)
const checked3 = ref(true)

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
const country = ref(null)

const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '67' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '87' },
]
const { currentStep, values, errors, isSubmitting } = storeToRefs(useCheckoutStore())
const { setFieldValue } = useCheckoutStore()

onMounted(() => {
  setFieldValue('shippingMethod', deliveryMethods[0])
})
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-4 formgrid">
      <div class="col-span-12 field mb-12">
        <span class="text-surface-900 text-2xl block font-medium mb-6">
          <UnoIcon class="pi pi-envelope text-xl mr-4" aria-hidden="true" />Contact Information
        </span>
        <div flex md:flex-row gap-4 flex-col mb-4>
          <div class="flex items-start flex-col gap-1 ">
            <label for="name" class="font-semibold md:w-34">Křestní jméno</label>
            <Field v-slot="{ field }" type="text" name="firstName">
              <IconField w-full>
                <InputIcon class="pi pi-user" />
                <InputText v-bind="field" placeholder="Například: Karel" w-full class="flex-auto" autocomplete="off" />
                <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
              </IconField>
            </Field>
            <ErrorMessage text-orange-500 name="firstName" />
          </div>

          <div class="flex items-start flex-col gap-1 ">
            <label for="lastname" class="font-semibold md:w-34">Příjmení</label>
            <Field v-slot="{ field }" type="text" name="lastName">
              <IconField w-full>
                <InputIcon class="pi pi-user" />
                <InputText v-bind="field" placeholder="Například: Novák" w-full class="flex-auto" autocomplete="off" />
                <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
              </IconField>
            </Field>
            <ErrorMessage text-orange-500 name="lastName" />
          </div>
        </div>
        <div class="flex items-start flex-col gap-1 mb-4">
          <label for="email" class="font-semibold md:w-34">Email</label>
          <Field v-slot="{ field }" type="text" name="email">
            <IconField w-full>
              <InputIcon class="pi pi-envelope" />
              <InputText v-bind="field" placeholder="Například: email@example.com" w-full class="flex-auto" autocomplete="off" />
              <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
            </IconField>
          </Field>
          <ErrorMessage text-orange-500 name="email" />
        </div>
        <div class="flex items-start flex-col gap-1 mb-4">
          <label for="phone" class="font-semibold md:w-34">Telefon</label>
          <Field v-slot="{ field }" type="text" name="phone">
            <IconField w-full>
              <InputIcon class="pi pi-phone" />
              <InputText v-bind="field" placeholder="Například: xxx-xxx-xxx" w-full class="flex-auto" autocomplete="off" />
              <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
            </IconField>
          </Field>
          <ErrorMessage text-orange-500 name="phone" />
        </div>

        <div class="flex items-center">
          <Checkbox id="checkbox-2" v-model="checked2" name="checkbox-2" :binary="true" class="text-surface-900 " />
          <label id="checkbox-2" class="text-surface-900 ml-2">Email me with news and offers</label>
        </div>
      </div>

      <div class="col-span-12 field ">
        <span class="text-surface-900 text-2xl block font-medium mb-6">
          <UnoIcon class="pi pi-user-edit text-xl mr-4" aria-hidden="true" />Fakturační údaje
        </span>
        <Field v-slot="{ value, handleChange }" name="country">
          <Select
            :model-value="value"
            :options="cities"
            placeholder="Country / Region"
            option-label="name"
            :show-clear="true"
            class="w-full"
            @update:model-value="handleChange"
          />
        </Field>
      </div>

      <div class="col-span-12 field ">
        <div class="flex items-start flex-col gap-1 mb-2">
          <label for="address" class="font-semibold md:w-34">Adresa</label>
          <Field v-slot="{ field }" type="text" name="street">
            <IconField w-full>
              <InputIcon class="pi pi-home" />
              <InputText v-bind="field" placeholder="Například: Hlavní 123" w-full class="flex-auto" autocomplete="off" />
              <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
            </IconField>
          </Field>
          <ErrorMessage text-orange-500 name="street" />
        </div>
      </div>

      <div class="col-span-12 field ">
        <div class="flex items-start flex-col gap-1 mb-2">
          <label for="address2" class="font-semibold md:w-34">Adresa 2</label>
          <Field v-slot="{ field }" type="text" name="street2">
            <IconField w-full>
              <InputIcon class="pi pi-building" />
              <InputText v-bind="field" placeholder="Například: Byt 4B" w-full class="flex-auto" autocomplete="off" />
              <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
            </IconField>
          </Field>
          <ErrorMessage text-orange-500 name="street2" />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-6 field ">
        <div class="flex items-start flex-col gap-1 mb-2">
          <label for="pc" class="font-semibold md:w-34">PSČ</label>
          <Field v-slot="{ field }" type="text" name="zip">
            <IconField w-full>
              <InputIcon class="pi pi-map-marker" />
              <InputText v-bind="field" placeholder="Např. 123 45" w-full class="flex-auto" autocomplete="off" />
              <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
            </IconField>
          </Field>
          <ErrorMessage text-orange-500 name="zip" />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-6 field ">
        <div class="flex items-start flex-col gap-1 mb-2">
          <label for="city" class="font-semibold md:w-34">Město</label>
          <Field v-slot="{ field }" type="text" name="city">
            <IconField w-full>
              <InputIcon class="pi pi-map" />
              <InputText v-bind="field" placeholder="Například: Praha" w-full class="flex-auto" autocomplete="off" />
              <InputIcon v-if="isSubmitting" class="pi pi-spin pi-spinner" />
            </IconField>
          </Field>
          <ErrorMessage text-orange-500 name="city" />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-6 field ">
        <div class="flex items-center">
          <Checkbox id="checkbox-3" v-model="checked3" name="checkbox-3" :binary="true" class="text-surface-900 " />
          <label id="checkbox-3" class="text-surface-900 ml-2">Save for next purchase</label>
        </div>
      </div>

      <div col-span-12>
        <div class="border-t border-gray-200 w-full pt-4">
          <fieldset>
            <span class="text-surface-900 text-2xl block font-medium mb-2">
              <UnoIcon class="pi pi-truck text-xl mr-4" aria-hidden="true" />Zvolte typ doručení
            </span>
            <Field v-slot="{ field, meta }" name="shippingMethod">
              <HeadlessRadioGroup
                v-bind="field"
                :class="meta.touched && meta.error ? 'border-red-500' : ''"
                class="mt-4 grid grid-cols-1 w-full gap-y-6 sm:grid-cols-2 sm:gap-x-4"
              >
                <HeadlessRadioGroupOption
                  v-for="deliveryMethod in deliveryMethods"
                  :key="deliveryMethod.id"
                  v-slot="{ active, checked }"
                  as="template"
                  :value="deliveryMethod"
                  :aria-label="deliveryMethod.title"
                  :aria-description="`${deliveryMethod.turnaround} for ${deliveryMethod.price}`"
                >
                  <div
                    :class="[
                      checked ? 'border-2 border-primary-500' : 'border-gray-300',
                      field.value.title === deliveryMethod.title ? 'border-3 border-primary-500' : '',
                      'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                    ]"
                  >
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <span class="block text-sm font-medium text-gray-900">{{ deliveryMethod.title }}</span>
                        <span class="mt-1 flex items-center text-sm text-gray-500">{{ deliveryMethod.turnaround }}</span>
                        <span class="mt-6 text-sm font-medium text-gray-900">{{ deliveryMethod.price }}</span>
                      </span>
                    </span>
                    <CheckCircleIcon v-if="checked" class="size-5 text-primary" aria-hidden="true" />
                    <span
                      :class="[
                        active ? 'border' : 'border-2',
                        checked ? 'border-primary' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg',
                      ]"
                      aria-hidden="true"
                    />
                  </div>
                </HeadlessRadioGroupOption>
              </HeadlessRadioGroup>
              <ErrorMessage name="shippingMethod" class="text-orange-500 mt-2 block" />
            </Field>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
