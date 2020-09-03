# React-Three-Fiber

- https://github.com/react-spring/react-three-fiber/blob/master/api.md
- https://threejs.org/docs/
- https://codesandbox.io/examples/package/react-three-fiber
- https://www.digitalocean.com/community/tutorials/react-react-with-threejs

## Versions

- react: 16.12.0
- react-dom: 16.12.0
- react-scripts: 3.0.1
- react-three-fiber: 4.2.10
- three: 0.119.1

## Problems

- Doesn’t update animations

## Entities

- Canvas
- group
- mesh

### Canvas

	fov: 75, near: 0.1, far: 1000, z: 5, lookAt: [0,0,0]

### Objects

#### mesh

	<mesh visible userData={{ hello: 'world' }} position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
	  <sphereGeometry attach="geometry" args={[1, 16, 16]} />
	  <meshStandardMaterial attach="material" color="hotpink" transparent />
	</mesh>

	  position={position}
	  onPointerOver={e => onHover(e, true)}
	  onPointerOut={e => onHover(e, false)}
	  
### Lights

	<ambientLight intensity={0.3} />

	<directionalLight position={[10, 10, 10]} intensity={0.5} />

	<pointLight position={[10, 10, 10]} />
	
	<rectAreaLight
		width={3}
		height={3}
		color="white"
		intensity={0.5}
		position={[-2, 0, 5]}
		lookAt={[0, 0, 0]}
		penumbra={1}
		castShadow
	/>

### Animation - useFrame
