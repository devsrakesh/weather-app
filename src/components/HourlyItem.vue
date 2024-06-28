<script lang="ts" setup>
import { useTemperatureConverter } from '@/composables/useTemperatureConverter';
import { useTimeFormatter } from '@/composables/useTimeFormatter';

const props = defineProps(['item'])

const { formatTime } = useTimeFormatter()
const { fahrenheitToCelsius } = useTemperatureConverter()
</script>

<template> 
    <div class="">
    <div  class="border ">
        <div  class="text-center ">
          {{ formatTime( props.item.dt) }}
        </div>
        <div class="flex justify-center items-center ">
            <img :src="`https://openweathermap.org/img/wn/${props.item?.weather[0].icon}.png`" class=""/>
            <div class=" text-sm ">{{fahrenheitToCelsius( props.item.temp ).toFixed()}} </div>
        </div>
    </div>
    </div>

</template>

<style lang="postcss" scoped>
    
</style>
