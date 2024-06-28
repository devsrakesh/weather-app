<script lang="ts" setup>
import { useTemperatureConverter } from '@/composables/useTemperatureConverter';
import { useTimeFormatter } from '@/composables/useTimeFormatter';

const props = defineProps(['item'])

const { formatTime } = useTimeFormatter()
const { fahrenheitToCelsius } = useTemperatureConverter()
</script>

<template> 
    <div class="">
    <div  class="text-white ">
        <div  class="text-center ">
          {{ (formatTime( props.item.dt) ).toUpperCase()}}
        </div>
        <div class="flex justify-center items-center ">
            <img :src="`https://openweathermap.org/img/wn/${props.item?.weather[0].icon}.png`" class="h-8"/>
            <div class=" text-sm ">{{fahrenheitToCelsius( props.item.temp ).toFixed()}} </div>
        </div>
    </div>
    </div>

</template>

