<template>
    <div class="vue-scroll"
        @touchstart="_touchstart($event)"
        @touchmove="_touchmove($event)"
        @touchend="_touchend($event)"
    >
        <div class="scroll-inner" 
        :style="{
            transform:'translate3d(0,'+top+'px,0)',
            marginTop:-offsetH+'px'
        }"
        :class="{'scroll-to-top':!touching}"
        >
            <div class="pull-to-refresh" v-if="!!refresh">
                <slot name='refresh' :style="{
                    'height':offsetH+'px',
                    'line-height':offsetH+'px'
                }" class="refresh">
                    <span :class="{
                        'icon-down-background':state==0,
                        'icon-up-background':state==1,
                        'icon-loading':state==2
                    }"></span>
                    
                    <span class="icon-down" v-if="state==0">下拉刷新</span>
                    <span class="icon-up" v-if="state==1">释放刷新</span>
                    <span class="icon-refreshing" v-if="state==2">正在刷新...</span>
                </slot>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    
    export default {
        props:{
            //加载函数
            refresh:{
                type:Function,
                default:undefined
            },
            //加载中的高度
            offsetH:{
                type:Number,
                default:44
            },
        },
        data () {
            return{
                top:0,
                //初始位置
                startY:0,
                //状态变化 0为下拉加载,1为释放加载,2为刷新,初始状态为0
                state:0,
            }
        },
        methods:{
            _touchstart(e){
                this.startY = e.touches[0].pageY;
                this.touching=true;
            },
            _touchmove(e){
                let diff = e.touches[0].pageY - this.startY;
                if(diff<0 || !this.touching || this.$el.scrollTop > 0)return 
                e.preventDefault();
                this.top=Math.pow(diff, 0.8)+(this.state==2?this.offsetH:0);
                if (this.state === 2) {
                    return
                }
                if (this.top >= this.offsetH) {
                    this.state = 1
                } else {
                    this.state = 0
                }
            },
            _touchend(e){
                this.touching=false;
                if(this.state==2){
                    this.top=this.offsetH;
                    return 
                }
                if(this.top>this.offsetH){
                    this.loading()
                }else{
                    this.state=0;
                    this.top=0
                }
            },
            loading(){
                this.state=2;
                this.top=this.offsetH;
                this.refresh(()=>{
                    this.state=0;
                    this.top=0
                })
            }
        }
    }
</script>
<style scoped>
    .vue-scroll{position: absolute;width:100%;height: 100%;overflow-y: scroll;}
    .scroll-inner{position:absolute;overflow-x: hidden;overflow-y: auto;width:100%;}
    .icon-down-background{display:inline-block;width: 20px;height: 20px;background: no-repeat 50%;background-image:url('../assets/img/test/down.png');background-size:16px;vertical-align: middle;-webkit-transition-duration: .3s;transition-duration: .3s;}
    .icon-up-background{display:inline-block;width: 20px;height: 20px;background: no-repeat 50%;background-image:url('../assets/img/test/down.png');background-size:16px;vertical-align: middle;transform:rotate(180deg);-webkit-transition-duration: .3s;transition-duration: .3s;}
    .pull-to-refresh{width:100%;height: 40px;line-height: 40px;color:#a1a1a1;text-align: center;}
    .scroll-to-top{-webkit-transition-duration: .3s;transition-duration: .3s;}
    .icon-loading{display:inline-block;width: 20px;height: 20px;background: no-repeat 50%;background-image:url('../assets/img/test/loading.png');background-size:20px;vertical-align: middle;-webkit-animation: loadingCircle 1s infinite linear;animation: loadingCircle 1s infinite linear;}

</style>