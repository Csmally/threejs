import * as THREE from 'three'; 
import { useEffect } from 'react';
import { Mesh } from 'three';
import './App.css';

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
    let renderer = new THREE.WebGLRenderer();
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
  
  
    //创建一个地面几何体
    let grounds = new THREE.PlaneGeometry(65,30)
    //给地面上色
    let groundColor = new THREE.MeshStandardMaterial({color:0xcccccc})
    //创建地面
    let ground = new THREE.Mesh(grounds,groundColor)
    //接收阴影
    ground.receiveShadow = true
    ground.rotation.x = -0.5*Math.PI
    ground.position.x = 15
    ground.position.y = 0
    ground.position.z = 0


    //创建立方体模型
    let lifangs = new THREE.BoxGeometry(6,6,6);
    let lifangColor = new THREE.MeshLambertMaterial({color:0xff0000})
    let lifang = new THREE.Mesh(lifangs,lifangColor)
    lifang.position.x = 0
    lifang.position.y = 3
    lifang.position.z = 0
    lifang.castShadow = true

    //创建球体
    let qiutis = new THREE.SphereGeometry(4,40,40)
    let qiutiColor = new THREE.MeshLambertMaterial({color:0x00ff00})
    let qiuti = new THREE.Mesh(qiutis,qiutiColor)
    qiuti.position.y = 4
    qiuti.position.x = 27
    qiuti.castShadow = true


    //创建聚光灯
    let light = new THREE.SpotLight({color:0xffffff})
    light.position.set(-40,40,30)
    light.castShadow = true
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    //将模型添加到场景中
    scene.add(ground)
    scene.add(lifang)
    scene.add(qiuti)
    scene.add(light)
  
  
    //定位相机，并且指向场景中心
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    //创建controls对象
    // let control = new THREE.OrbitControls(camera, renderer.domElement)
    // control.addEventListener('change',render)
    document.getElementById('test').appendChild(renderer.domElement)
    renderer.render(scene,camera)


    //动画
    let render = () => {
        renderer.render(scene,camera)
        // lifang.position.x += 1
        // lifang.rotation.x += -Math.PI/50
        lifang.rotateY(0.01)
        requestAnimationFrame(render)
    }
    // render()
  }

  return (
    <div id='test'>
        
    </div>
  );
}

export default App;
