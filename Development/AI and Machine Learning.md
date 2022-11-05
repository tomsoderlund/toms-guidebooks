# AI and Machine Learning

This page: http://SDRLND.ME/ai-ml-github

Tweet: [_“Ok, I feel I need to learn AI/ML now.”_](https://twitter.com/tomsoderlund/status/1583894481408905216)

## Usecases

Broadly speaking, we today use Machine Learning (ML) for:

1. Classification (spam detection etc)
2. Generation (text, images etc)

## Learning resources

⚠️ Two great courses for ML beginners: [Google’s (theoretical)](https://developers.google.com/machine-learning/crash-course/ml-intro) and [FastAI’s (practical)](https://course.fast.ai/).

- Google:
	- https://developers.google.com/machine-learning/crash-course/ml-intro
	- https://developers.google.com/machine-learning/problem-framing/problem
	- Playground: https://playground.tensorflow.org/
- [FastAI](https://course.fast.ai/)
- [Kaggle](https://www.kaggle.com/learn/intro-to-machine-learning)
- O’Reilly:
	- https://learning.oreilly.com/playlists/907fa947-4eba-4c1c-bcbd-9cc5167568d7/
	- https://learning.oreilly.com/courses/dataml-engineer/
	- https://learning.oreilly.com/library/view/python-machine-learning/9781789955750/Text/Chapter_1.xhtml#_idParaDest-23
- [VS Code](https://code.visualstudio.com/docs/datascience/data-science-tutorial)
- W3schools Python: https://www.w3schools.com/python/python_ml_getting_started.asp
- https://twitter.com/1littlecoder/status/1580555066791972866

## People

- [Tom’s Twitter list “AI & ML”](https://twitter.com/i/lists/1577855041150541826)

## Tools

- Python is the common programming language for AI/ML.
- ⚠️ “Notebook software” for writing/documenting/sharing ML code – essentially word processors with embedded (Python) code blocks. Uses `.ipynb` files, which are JSON structures containing Python code blocks and Markdown text blocks:
	- [Jupyter Notebook](https://jupyter.org/): the original (see below)
	- [VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks) has built in Jupyter support
	- [Google Colab](https://colab.research.google.com/): work with files on Google Drive and GitHub
	- [Kaggle](https://www.kaggle.com/)
	- [Gradio](https://gradio.app/) for building UI’s inside notebooks
- ⚠️ ML code examples:
	- [HuggingFace Spaces](https://huggingface.co/spaces): discover ML apps
	- [Kaggle Code](https://www.kaggle.com/code): explore, run, share ML code
- Frameworks & libraries:
	- [PyTorch](https://pytorch.org/) – open source machine learning framework
	- [TensorFlow](https://www.tensorflow.org/) – Google
	- [JAX](https://jax.readthedocs.io/en/latest/)
	- [FastAI](https://docs.fast.ai/)
- Models:
	- [HuggingFace](https://huggingface.co/): “GitHub for AI models”
	- [EleutherAI](https://www.eleuther.ai/): open source AI models
	- [OpenAI](https://openai.com/): private/closed source – GPT-3, DALL·E

### Jupyter Notebook

- Press Tab to get autocompletion suggestions
- Inside the parentheses of a function, pressing Shift + Tab will display signature and description of the function
- `?[function]` to get help on function: `?verify_images`, or `??verify_images` for full source code
- `doc([function])` to get documentation page
- `%debug`: inspect every variable

### Models

- GPT-Neo 1.3B: a transformer model designed using EleutherAI’s replication of the GPT-3 architecture.
- GPT-J 6B: a transformer model trained using Ben Wang's Mesh Transformer JAX.

## Machine Learning Theory

Machine learning algorithm:

	Inputs + Weights → Model → Results + Loss
	…then adjust Weights

⚠️ ML input data is **always in number format** (with decimals), even though it came from text/image/video/sound. See “Feature engineering” below.

### Terminology

- **Matrix**: rows × columns, e.g. 150×4
- **Features**: inputs, `x₁`, `x₂`, etc
- **Label**: `y`, what we want to predict
- **Example**: one piece of data (features, labeled or unlabeled)
- **Model**: what does the predicting
- **Slope**: `m`
- **Weight**: `w`
- **Bias**: `b`
- **Loss**: mismatch with model, *mean square error*
- **Learning rate**: granularity when training model
- **Batch**: the set of examples used in one training iteration
- **Epoch**: number of passes of the entire training dataset the machine learning algorithm has completed
- **Gradient Descent**: algorithm for finding minima
- **Hyperparameters**: the knobs that programmers tweak in machine learning algorithms
- **Deep learning**: artificial neural networks with representation learning
- **Data augmentation**: creating random variations of our input data so they appear different, but do not actually change the meaning of the data. E.g. image rotation and flipping.
- **Generalization**: a model’s ability to adapt properly to new, previously unseen data.
- **Feature engineering**: transform inputs so they can be used in model.
- **IPython**: 
- **REPL**: 

### Learning types

- **Supervised learning**: labeled data/output
- **Reinforcement learning**: reward signal, e.g. chess engine
- **Unsupervised learning**: hidden structures – clustering, dimensionality reduction

Also: feature learning/representation learning

### Neural networks

Neural network: multiply, add them up, replace negatives with zeroes.

- **CNN: Convolutional Neural Network**, a deep learning neural network sketched for processing structured arrays of data such as portrayals.
- **RNN: Recurrent Neural Network**, a class of artificial neural networks where connections between nodes can create a cycle, allowing output from some nodes to affect subsequent input to the same nodes.
- **Transformer**: is a deep learning model that adopts the mechanism of self-attention, differentially weighting the significance of each part of the input data. It is used primarily in the fields of natural language processing (NLP) and computer vision (CV).

### Vector search and Semantic search

- **Vector search**: matching search key’s vectors’ proximity in vector space with other items.
- **Semantic search**: NLP for transforming search phrase into vectors, then vector search for matching their proximity in vector space with other items. These vectors are usually called **embeddings**.
- **Embeddings**: special type of vector that is produced as a result of running an input through an ML model - usually a neural network.
- **Dense retrieval**: using embeddings to search.

## Deployment

There are two main use cases for deploying ML code: **training** and **inference**.

For inference, there are three options:

1. Use your own cloud compute/GPU and have your backend use that.
2. SageMaker Inference service and ping that from your backend.
3. GCP’s ML Inference service and ping that from your backend.
