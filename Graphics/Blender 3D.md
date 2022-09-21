# Blender 3D

- LMB: Select, Shift-RMB extend selection
- RMB: Context menu
- Wheel: Zoom, Click+drag to Rotate

More:

- F12 (Mac: `fn` + 🔊): Render image (cancel with `Esc`)
- Z: Toggle Wireframe/Solid/Rendered
- Space: Play timeline

## File management

- Save file: Cmd-S
- Save default scene template: Ctrl-U (backup Default.blend in 3Dstuff)
- Reset/New file: Ctrl-X

## Navigation and Viewport

Note: `Z` is up.

- Pan: Shift-Mousewheel
- Rotate: Mousewheel
- Zoom: scroll with Mousewheel

Windows: resize with LMB, split/join with RMB
Ctrl-Up: maximize current window

Top/Front etc: use View menu (in window header)

H: Hide. Shift-H: hide all but selected. Alt-H: unhide all.

## Transformations (Move/Rotate/Size)

- G: Move, use X/Y/Z to lock dimensions, input numbers with keypad. Or drag arrow on object (if 3D Transform Manipulator "hand" is enabled). Reset position: Alt+G.
- R: Rotate (options: see Move). Reset rotation: Alt+R.
- S: Resize (options: see Move). Reset scale: Alt+S.
- Alt+O: Reset origin

### Cursor and Grid

- Reset Cursor: Shift-C
- Ctrl+Drag in transformation handle to snap-to (Magnet button).
- Shift-S: Snap to Cursor/Grid
- Shift-Tab: Snap to Grid

### Areas, Workspaces, Scenes, Layers, Collections

User interface:

- **Windows:** a floating window in your OS, can contain Areas and Workspaces.
- **Areas:** viewports/frames
	- Split: by moving cursor to corner, it turns into a `+`
	- Join: `+` cursor, then drag into other area
- **Workspaces:** Areas are grouped into Workspaces, with predefined tabs such as Layout, Modeling, etc.

File structure:

- **Scenes:** each file can contain multiple scenes, which share other data such as objects and materials.
- **Layers:** can be used to render different elements or different groups of elements in your scene separately. A “larger” concept than Collection; and Collections can be included/excluded in a Layer (checkbox).
- **Collections:** used to just logically organize your scene, or to facilitate one-step appending or linking between files or across scenes.

## Manipulating (Multiple) Objects

- Shift-A: add object
- X: Delete object
- Ctrl-P: Parent object 1 to object 2
- Shift-D: Duplicate, Alt-D Duplicate Linked

## Shaping (Individual) Objects

- Tab: Toggle Edit/Object mode
- Ctrl-Tab: Vertex/Edge/Face mode

Actions:

- A: Select all/none
- B: Select box (B+B: select circle)
- X: Delete
- F: Make face (polygon)
- E: Extrude
- Ctrl+B: Bevel
- W: Specials: Remove doubles, Subdivide, Bevel, Flip Normals, etc

### Curves

- Ctrl-LMB: Add points
- C: Close curve
- Ctrl-J: Join curves

Illustrator: AI v8, use Alt-C in Object Mode to convert curve to mesh

### Modelling

Spin (make a cup): Mesh Tools (F9), select viewport for axis to rotate around, Spin.
Bevel along curve (make rails)

## Materials and Texturing

- Material panel
- Load texture: 🟡 near Base Color → Image Texture

### Finding materials

- https://BlenderKit.com (add-on for Blender)
- https://AmbientCG.com
- https://CGBookcase.com
- https://Poliigon.com
- https://Polyhaven.com
- https://ShareTextures.com
- https://3DTextures.me
- https://Textures.com
- https://BlenderMada.com
- https://TextureNinja.com

### Load Material Library:

- File → Append or Link
- Select .blend file
- Select Material
- Use Cmd-Click to select materials
- Click Load Library

### UV Editor: Scale Texture

- Enter UV Editor panel
- A to select all
- S to scale
- G to move

### UV Mapping/Unwrap

- Select vertices.
- Ctrl+E, then Mark Seam.
- Change mode to "UV Face Select".
- Show view "UV/Image Editor".
- U key, then "unwrap".
- Create texture (square), then Load image.
- Enable "TexFace" on material before rendering.

### PNG billboard with Alpha channel

- A: 1.0, ZTransp: ON
- MapTo: Alpha reversed, Spec reversed, DVar = 0.0
- Texture: UseAlpha ON, Clip ON.

Double Sided: only for 3D view
No. V.Normal Flip: to enable flipped normals

## Lighting

Use Spot lights for more control (halos).

http://wiki.blender.org/index.php/Doc:Tutorials/Lighting/Three_Point_Light
http://www.cgsutra.com/blender_tutorials/b0010_lighting_in_blender/lighting_in_blender.php

## Camera

Select camera, then:

- G: Move. Click mousewheel: move in/out.
- R: Rotate

## Animation

- I: Insert Keyframe
- Alt-A: Animation Preview

## Physics

- “Physics” sidepanel

Rigid body:

- Physics → Rigid Body
- Remove: × button in front of Rigid Body
- Type: Active = physics, Passive = animation system
- Dynamic off = for walls etc
- Animated: on = controlled by animation system. Toggle this off to let the physics to take over.

## Render movie

1. Blender Output tab: set to “FFmpeg Video”
2. Set output folder, default is `/tmp`
3. Render → Render Animation (abort with `Esc`)

### Render movie from still frames

1. Render image sequence as PNG’s, normally outputs to `/tmp` folder
2. File → New → Video Editing
3. Add → Image/Sequence
4. Set length of movie in frames
5. Render → Render Animation

## Solid Modelling and 3D Printing

http://www.shapeways.com/tutorials/prepping_blender_files_for_3d_printing

- Check if manifold (watertight): Ctrl-Opt-Shift-M
- Hide other: Shift-H
- Export to .STL for Shapeways etc.

Split part of a mesh into its own object by selecting all the vertices in the mesh and hitting the P key
Selecting a single vertex and then holding down Ctrl-+ will select all attached vertices.

Metric units:

- Scene → Units → Metric
- Grid is 1m by default → default Blender Cube is (2m)^3
- Can change mm/m scale when importing to Shapeways

http://www.katsbits.com/tutorials/blender/metric-imperial-units.php

### Solid Modeling 2

- Set units: Scene → Units: Metric (default: m, Scale: 0.01 = cm). Set grid size in Display → Grid. http://www.katsbits.com/tutorials/blender/metric-imperial-units.php
- Set sizes in "XYZ Euler" (near Display settings).
- Object → Apply Transformation (Ctrl+A) to clear scale factors etc.
- View ortho is helpful.
- Export as: OBJ, STL format.
- Modifiers:
	- "Solidify": make walls
	- "Subdivision" modifier for smoothness
	- "Mirror" modifier to avoid doing things twice
- Important:
	- Need an "escape hole" for leftover material
	- "Non-manifold edges": open/not water-tight, or shared by

## 3D Scanning and Photogrammetry

- iOS apps: Scaniverse (FBX format), Polycam (glTF format is free)
- Import FBX with textures and all into Blender

## Motion Tracking with Video

https://docs.blender.org/manual/en/latest/movie_clip/tracking/introduction.html

## Add-ons

How to install Blender add-ons:

1. Download the add-on ZIP to your computer.
2. Go to the Add-ons section in Edit → Preferences.
3. Click Install button, then select the add-on ZIP using the File Browser.
5. Enable the add-on with the checkbox.

## Debugging mode

Run `/Applications/Blender.app/Contents/MacOS/Blender` from Terminal to see log messages.

## More Info

- Tutorial: http://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro
- Interface: http://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro/The_3D_Viewport_Window
- Modelling Keyboard: http://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro/Hot_Keys
