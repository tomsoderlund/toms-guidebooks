## Objects

Empty
Prefab (objects that can be spawned): Assets → Create → Prefab

WORKFLOW: 3D GRAPHICS IMPORT

Blender: http://unity3d.com/support/documentation/Manual/HOWTO-ImportObjectBlender.html



## Input

Input Manager: Edit → Project Settings → Input

PS4: https://www.reddit.com/r/Unity3D/comments/1syswe/ps4_controller_map_for_unity/


## Physics

Colliders: make Box Collider slight larger to avoid tunneling.

Component → Physics → RigidBody

Update() - depends on framerate
FixedUpdate() for physics behaviour
LateUpdate() - happens after Update()


## Particle Systems

Game Object → Create Other → Particle System

Ellipsoid = size
Rnd Velocity = randomness


## Scripting

### Key methods

Start
Update
FixedUpdate // fixed rate - for forces etc

### Expose properties

Non-private methods are exposed to Inspector

### Debugging:

Debug.Log('planet distance: ' + dist);

Gizmos for visual debugging: https://docs.unity3d.com/ScriptReference/Gizmos.html
