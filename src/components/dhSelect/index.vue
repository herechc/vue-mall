<template>
  <div class="dh-select">
    <div :class="['dh-diplay',{icon: types == 'icon'}]" @click="isShow = true">
      <span v-if="selected.province.id && types == 'block'">{{selected.province.name}}</span>
      <span v-if="selected.city.id && types == 'block'">{{selected.city.name}}</span>
      <span v-if="selected.area.id && types == 'block'">{{selected.area.name}}</span>
    </div>
    <div class="dh-mark" v-show="isShow"></div>
    <transition name="dh-select-fade">    
      <div class="dh-body" v-show="isShow">
        <div class="dh-wrap">
          <div class="dh-title">
            <span>所在区域</span>
            <div class="dh-close" @click="isShow = false">关闭</div>
          </div>
          <div class="topTab">
            <span :class="{cur:tab == 'province'}" @click="tab = 'province'">{{selected.province.id ? selected.province.name : '请选择'}}</span>
            <span :class="{cur:tab == 'city'}" @click="tab = 'city'" v-if="selected.province.id">{{selected.city.id ? selected.city.name : '请选择'}}</span>
            <span :class="{cur:tab == 'area'}" @click="tab = 'area'" v-if="selected.city.id">{{selected.area.id ? selected.area.name : '请选择'}}</span>
          </div>
          <div class="dh-list-bd" >
            <div class="dh-list dh-provs" v-if="tab == 'province'">
              <div :class="['list',{cur:item.id == selected.province.id}]" v-for="item in provinces" :key="item.id" @click="handleSelectProv(item)">{{item.name}}</div>
            </div>
            <div class="dh-list dh-citys" v-if="tab == 'city'">
              <div :class="['list',{cur:item.id == selected.city.id}]" v-for="item in citys" :key="item.name" @click="handleSelectCity(item)">{{item.name}}</div>
            </div>
            <div class="dh-list dh-areas" v-if="tab == 'area'">
              <div :class="['list',{cur:item.id == selected.area.id}]" v-for="item in areas" :key="item.name" @click="handleSelectArea(item)">{{item.name}}</div>
            </div>
          </div>    
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
var _DataList
import { Button } from 'mint-ui'
export default {
  name: 'dhSelect',
  components: {
    [Button.name]: Button
  },
  props: {
    types: {
      type: String,
      default: 'block'
    } // icon
  },
  data() {
    return {
      // 默认数据
      provinces: [],
      citys: [],
      areas: [],
      // tab切换索引
      tab: 'province',
      selected: {
        province: {},
        city: {},
        area: {}
      },
      isShow: false
    }
  },
  methods: {
    handleSelectProv(item) {
      this.selected.province = {}
      this.selected.city = {}
      this.selected.area = {}
      this.citys = []
      this.selected.province = Object.assign({}, item)
      let _citys = _DataList[item.id].cities
      Object.keys(_citys).forEach(key => {
        this.citys.push({
          id: key,
          name: _citys[key].name
        })
      })
      this.tab = 'city'
    },
    handleSelectCity(item) {
      this.selected.city = {}
      this.areas = []
      this.selected.city = Object.assign({}, item)
      let _area = _DataList[this.selected.province.id].cities[item.id].districts
      Object.keys(_area).forEach(key => {
        this.areas.push({
          id: key,
          name: _area[key][0]
        })
      })
      this.tab = 'area'
    },
    handleSelectArea(item) {
      this.selected.area = {}
      this.selected.area = Object.assign({}, item)
      this.$emit('selectChange', this.selected)
    }
  },
  mounted() {
    require.ensure([], () => {
      let provs = require('./area').default.result
      Object.keys(provs).forEach(key => {
        _DataList = Object.assign({}, _DataList, provs[key].provinces)
      })
      Object.keys(_DataList).forEach(key => {
        this.provinces.push({
          id: key,
          name: _DataList[key].name
        })
      })
    })
  }
}
</script>
<style scoped>
.dh-diplay{
  border: 1px solid #dbdbdb;
  height: 45px;
  font-size:14px;
  padding: 0 15px;
  line-height:45px;
  background:#fff;
  position: relative;
}
.dh-diplay span{
  margin-right:10px
}
.icon{
  border:0
}
.dh-diplay:after{
  content: '';
  position: absolute;
  width:9px;
  height:9px;
  border-color:#c8c8cd;
  border-width:1px 1px 0 0;
  transform:rotate(135deg);
  border-style:solid;
  top:50%;
  margin-top:-8px;
  right:15px;
}
.dh-mark{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  z-index: 99;
  background:rgba(0,0,0,0.7);
}
.dh-body{
  position: fixed;
  top:0;
  width:100%;
  height:100%;
  left: 0;
  z-index: 99999;
}
.dh-title{
  text-align: center;
  background-color: #f0f0f0;
  position: relative;
  height: 40px;
  line-height: 40px;
  border-top: #dbdbdb;
}
.dh-close{
  position: absolute;
  right: 15px;
  top:0
}
.dh-select .dh-wrap{
  background:#fff;
  position: absolute;
  bottom:0;
  width:100%;
}
.dh-select .topTab{
  height: 30px;
  line-height:30px;
  padding-left:15px;
  border-bottom:1px solid #d9d9d9;
  display: flex;
  padding-top:5px;
  font-size:16px;
}
.dh-select .topTab span.cur{
  border-bottom:1px solid #2ea6f2;
  color:#2ea6f2
}
.dh-select .topTab span + span{
  margin-left:10px
}
.dh-list-bd{
  font-size:14px;
  height: 300px;
  padding:10px 15px 15px;
  overflow-y:auto;
  color:#9f9f9f
}
.dh-list-bd .list{
  padding:8px 0
}
.dh-list-bd .list.cur{
  color:#2ea6f2
}
.dh-select-fade-enter-active {
  animation: dh-select-fade-in 0.3s  linear;
}

.dh-select-fade-leave-active {
  animation: dh-select-fade-out 0.3s  linear;
}

@keyframes dh-select-fade-in {
  0% {
      transform: translateY(100%);
  }
  100% {
      transform: none;
  }
}

@keyframes dh-select-fade-out {
  0% {
      transform: none;
  }
  100% {
      transform: translateY(100%);
  }
}
</style>
