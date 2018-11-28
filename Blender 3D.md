BLENDER - QUICK INTRODUCTION

LMB: Place 3D cursor (reset: Shift-C, center on cursor: C)
RMB: Select, Shift-RMB extend selection
Wheel: Zoom, Click to Rotate

Space: Context menu

Undo: U (Cmd-Z)
Redo: Shift-U

Save file: Cmd-S
Save default scene template: Ctrl-U (backup Default.blend in 3Dstuff)

Reset/New file: Ctrl-X


NAVIGATION AND VIEWPORT

Pan: Shift-Mousewheel
Rotate: Mousewheel
Zoom: scroll with Mousewheel, Ctrl-Mousewheel

Windows: resize with LMB, split/join with RMB
Ctrl-Up: maximize current window

Top/Front etc: use View menu (in window header)

Z: Toggle Wireframe/Solid

H: Hide. Shift-H: hide all but selected. Alt-H: unhide all.

Layers (the 20 boxes): 
* click to change, Shift-click to select, Shift-` selects all
M: Move to layer


TRANSFORMATIONS (MOVE/ROTATE/SIZE)

Move: G, use X/Y/Z to lock dimensions, input numbers with keypad. Or drag arrow on object (if 3D Transform Manipulator "hand" is enabled). Reset position: Alt+G.
Rotate: R (options: see Move). Reset rotation: Alt+R.
Resize: S (options: see Move). Reset scale: Alt+S.
Reset origin: Alt+O.

Reset Cursor: Shift-C
Ctrl+Drag in transformation handle to snap-to (Magnet button).
Snap to Cursor/Grid: Shift-S


EDITING

Tab: Toggle Edit/Object mode
Ctrl-Tab: Vertex/Edge/Face mode

A: Select all/none
B: Select box (B+B: select circle)
X: Delete
F: Make face (polygon)
E: Extrude
Ctrl+B: Bevel
W: Specials: Remove doubles, Subdivide, Bevel, Flip Normals, etc


Curves:

Ctrl-LMB: Add points
C: Close curve
Ctrl-J: Join curves

Illustrator: AI v8, use Alt-C in Object Mode to convert curve to mesh


MODELLING

Spin (make a cup): Mesh Tools (F9), select viewport for axis to rotate around, Spin.
Bevel along curve (make rails)

Ctrl-P: Parent object 1 to object 2

Shift-D: Duplicate, Alt-D Duplicate Linked



TEXTURING

Load Material Library:
- File -> Append or Link
- Select .blend file
- Select Material
- Use Cmd-Click to select materials
- Click Load Library

UV Mapping/Unwrap:
- Select vertices.
- Ctrl+E, then Mark Seam.
- Change mode to "UV Face Select".
- Show view "UV/Image Editor".
- U key, then "unwrap".
- Create texture (square), then Load image.
- Enable "TexFace" on material before rendering.

PNG billboard with Alpha channel:
- A: 1.0, ZTransp: ON
- MapTo: Alpha reversed, Spec reversed, DVar = 0.0
- Texture: UseAlpha ON, Clip ON.


Double Sided: only for 3D view
No. V.Normal Flip: to enable flipped normals


LIGHTING

Use Spot lights for more control (halos).

http://wiki.blender.org/index.php/Doc:Tutorials/Lighting/Three_Point_Light
http://www.cgsutra.com/blender_tutorials/b0010_lighting_in_blender/lighting_in_blender.php


CAMERA, ANIMATION AND RENDERING

Shift-F: Camera Fly Mode
I: Insert Keyframe
Alt-A: Animation Preview
Render: Alt+F12 (Mac)


SOLID MODELLING AND 3D PRINTING

http://www.shapeways.com/tutorials/prepping_blender_files_for_3d_printing

* Check if manifold (watertight): Ctrl-Opt-Shift-M
* Hide other: Shift-H
* Export to .STL for Shapeways etc.

Split part of a mesh into its own object by selecting all the vertices in the mesh and hitting the P key
Selecting a single vertex and then holding down Ctrl-+ will select all attached vertices.


Metric units:
* Scene -> Units -> Metric
* Grid is 1m by default -> default Blender Cube is 2m^3
* Can change mm/m scale when importing to Shapeways

http://www.katsbits.com/tutorials/blender/metric-imperial-units.php



MORE INFO

Tutorial: http://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro
Interface: http://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro/The_3D_Viewport_Window
Modelling Keyboard: http://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro/Hot_Keys


IMAGE SIZES

4x3	16x9
------------------
80x60	80x45
100x75	100x56
200x150	200x113
240x180	240x135
320x240	320x180
400x300	400x225
640x480	640x360
720x540	720x405
1024x768	1024x576



SOLID MODELING

* Set units: Scene -> Units: Metric (default: m, Scale: 0.01 = cm). Set grid size in Display -> Grid. http://www.katsbits.com/tutorials/blender/metric-imperial-units.php
* Set sizes in "XYZ Euler" (near Display settings).
* Object -> Apply Transformation (Ctrl+A) to clear scale factors etc.
* View ortho is helpful.
* Export as: OBJ, STL format.
* Modifiers:
	* "Solidify": make walls
	* "Subdivision" modifier for smoothness
	* "Mirror" modifier to avoid doing things twice
* Important:
	* Need an "escape hole" for leftover material
	* "Non-manifold edges": open/not water-tight, or shared by
