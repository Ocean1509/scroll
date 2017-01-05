
<template>
    <div class="test">
        <h2>下拉刷新</h2>
        <scroll :refresh='refresh' :offsetH='40' :bottomRefresh='bottomRefresh'>
            <div v-for="item in items" class="demo">{{item}}</div>
        </scroll>
    </div>
    
</template>
<script>

    import scroll from '../components/scroll'
    export default {
        data(){
            return{
                items:[],
                //加载隐藏区高度
                offsetH:40
            }
        },
        methods:{
            refresh(cb){
                let _this=this;
                setTimeout(function(){
                    const math=Math.ceil(Math.random()*10);
                    for(let i=0;i<math;i++){
                        _this.items.push(Math.ceil(Math.random()*100))
                    }
                    cb()                                    
                    
                },2000)
            },
            bottomRefresh(){
                let _this=this;
                setTimeout(function(){
                    const math=Math.ceil(Math.random()*10);
                    for(let i=0;i<math;i++){
                        _this.items.push(Math.ceil(Math.random()*100))
                    }
                    
                },2000)
            }
        },
        mounted(){
            this.items = this.items.concat([12,4,245,23,4,34,53,34,32,5,23,512,5,2,3,45,2,24,34,34,342,532,34,532,4,23])    
        },
        components:{
            scroll
        }
    }
</script>
<style scoped>
    .test h2{background-color:#fff;text-align: center;border-bottom:2px solid #eaeaea;line-height: 40px;height: 40px;width:100%;position: fixed;top:0;left:0;z-index:999}
    .demo{border-bottom:1px solid #eaeaea;height: 30px;line-height: 30px;background-color: #fff;text-align: center;}
</style>