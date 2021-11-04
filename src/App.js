import * as THREE from 'three'; 
import { useEffect } from 'react';
import './App.css';
import earthimg from './statics/earth.jpg'
import moonimg from './statics/moon.jpg'
import { OrbitControls } from './utils/OrbitControls'

function App() {
  useEffect(()=>{
    threeD()
  })
  let threeD = () => {

    // 设置场景
    let scene = new THREE.Scene()
    //设置相机
    let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,2000)
    //创建渲染器
    let renderer = new THREE.WebGLRenderer()
    //创建字体渲染
    // let fontRender = new
    //创建时钟
    let clock = new THREE.Clock()
    //实例化加载器
    let newObj = new THREE.TextureLoader()


    //设置颜色
    renderer.setClearColor(new THREE.Color(0xeeeeee))
    //打开渲染器投影
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    //设置尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
  
  
    //显示三位坐标系
    let axes = new THREE.AxesHelper(20)
    //添加坐标系到场景中
    scene.add(axes)
  
  


    //创建球体-地球
    let earths = new THREE.SphereGeometry(5,50,50)
    let earthColor = new THREE.MeshPhongMaterial({map:newObj.load('./statics/earth.jpg')})
    let earth = new THREE.Mesh(earths,earthColor)
    // earth.position.y = 4
    // earth.position.x = 27
    earth.castShadow = true
    // 创建球体-月球
    let moons = new THREE.SphereGeometry(1.5,25,25)
    let moonColor = new THREE.MeshPhongMaterial({map:newObj.load(require('./statics/moon.jpg'))})
    let moon = new THREE.Mesh(moons,moonColor)
    moon.position.y = 4
    moon.position.x = 10
    moon.castShadow = true


    //创建聚光灯
    let light = new THREE.SpotLight({color:0xffffff,intensity:10})
    light.position.set(0,0,30)
    light.castShadow = true
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    //将模型添加到场景中
    scene.add(light)
    scene.add(earth)
    scene.add(moon)
  
    //定位相机，并且指向场景中心
    camera.position.set(10,5,50)
    camera.lookAt(scene.position)

    document.getElementById('test').appendChild(renderer.domElement)
    renderer.render(scene,camera)
    
    
    //动画
    let render = () => {
        renderer.render(scene,camera)
        requestAnimationFrame(render)
    }

    //创建controls对象
    let control = new OrbitControls(camera, renderer.domElement)
    control.addEventListener('change',render)
    // render()
  }

  return (
    <div id='test'>
        
    </div>
  );
}

export default App;
