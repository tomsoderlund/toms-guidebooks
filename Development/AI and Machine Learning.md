# AI and Machine Learning

## Usecases

Broadly speaking, we today use ML for:

1. Classification (spam detection etc)
2. Generation (text, images etc)

## Learning resources

Two great courses for ML beginners: [Google’s (theoretical)](https://developers.google.com/machine-learning/crash-course/ml-intro) and [FastAI’s (practical)](https://course.fast.ai/).

- Google
	- https://developers.google.com/machine-learning/crash-course/ml-intro
	- https://developers.google.com/machine-learning/problem-framing/problem
	- Playground: https://playground.tensorflow.org/
- FastAI
	- https://course.fast.ai/
- O’Reilly:
	- https://learning.oreilly.com/playlists/907fa947-4eba-4c1c-bcbd-9cc5167568d7/
	- https://learning.oreilly.com/courses/dataml-engineer/
	- https://learning.oreilly.com/library/view/python-machine-learning/9781789955750/Text/Chapter_1.xhtml#_idParaDest-23
- W3schools Python: https://www.w3schools.com/python/python_ml_getting_started.asp
- https://twitter.com/1littlecoder/status/1580555066791972866

[Tom’s Twitter list](https://twitter.com/i/lists/1577855041150541826)

## Tools

- Python is the common programming language for AI/ML.
- Notebook software for writing/documenting/sharing ML code:
	- https://jupyter.org/
	- https://colab.research.google.com/
	- https://www.kaggle.com/
- Frameworks & libraries:
	- https://pytorch.org/ – open source machine learning framework
	- https://www.tensorflow.org/ – Google
	- FastAI: https://docs.fast.ai/
	- https://gradio.app/ for building UI’s inside notebooks
- Models:
	- https://huggingface.co/
	- https://www.eleuther.ai/

### Models

- GPT-Neo 1.3B: a transformer model designed using EleutherAI’s replication of the GPT-3 architecture.
- GPT-J 6B: a transformer model trained using Ben Wang's Mesh Transformer JAX.

### Jupyter Notebooks

- Jupyter uses `.ipynb` files, which are essentially a JSON structure containing Python code blocks and Markdown text blocks.
- `.ipynb` can be opened in Google Colab, Kaggle, and VSCode
- Press Tab to get autocompletion suggestions
- Inside the parentheses of a function, pressing Shift + Tab will display signature and description of the function
- `?[function]` to get help on function: `?verify_images`, or `??verify_images` for full source code
- `doc([function])` to get documentation page
- `%debug`: inspect every variable

## Notes

Machine learning algorithm:

	Inputs + Weights → Model → Results + Loss, then adjust Weights

### Terminology

- Matrix: rows × columns, e.g. 150×4
- Label: `y`, what we want to predict
- Features: inputs, x₁, x₂
- Example: one piece of data (features, label or unlabeled)
- Model: what does predicting
- Slope: `m`
- Weight: `w`
- Bias: `b`
- Loss: mismatch with model, _mean square error_
- Learning rate: granularity when training model
- Batch: the set of examples used in one training iteration
- Epoch: number of passes of the entire training dataset the machine learning algorithm has completed
- Gradient Descent: finding minima
- Hyperparameters: the knobs that programmers tweak in machine learning algorithms
- Deep learning: artificial neural networks with representation learning

### Learning types

- Supervised learning: labeled data/output
- Reinforcement learning: reward signal, e.g. chess engine
- Unsupervised learning: hidden structures – clustering, dimensionality reduction

Also: feature learning/representation learning

### Neural networks

Neural network: multiply, add them up, replace negatives with zeroes.
