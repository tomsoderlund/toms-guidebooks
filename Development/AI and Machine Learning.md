# AI and Machine Learning

⚠️ = extra important resources for beginners.

- This page: http://SDRLND.ME/ai-ml-github
- My own AI/ML resources: https://www.tomsoderlund.com/ai/ai-resources
- Tweet: [_“Ok, I feel I need to learn AI/ML now.”_](https://twitter.com/tomsoderlund/status/1583894481408905216)

Thank you to [@spimescape](https://twitter.com/spimescape) for mentoring me!

## Use cases

Broadly speaking, we today use Machine Learning (ML) for:

1. Classification (e.g. spam detection, find objects/people in images)
2. Generation/conversion (e.g. text, images, video, audio etc)
3. Search
4. Recommendations (e.g. music, film, products)

## Learning resources

⚠️ Two great free courses for ML beginners: [Google’s (theoretical)](https://developers.google.com/machine-learning/crash-course/ml-intro) and [FastAI’s (practical)](https://course.fast.ai/).

- [Google ML Foundational Courses](https://developers.google.com/machine-learning)
	- ⚠️ [ML Crash Course with TensorFlow APIs](https://developers.google.com/machine-learning/crash-course/ml-intro)
	- [Problem Framing](https://developers.google.com/machine-learning/problem-framing/problem)
	- [TensorFlow Playground](https://playground.tensorflow.org/)
- ⚠️ [FastAI: “Practical Deep Learning for Coders”](https://course.fast.ai/)
	- [YouTube video lessons](https://www.youtube.com/playlist?list=PLfYUBJiXbdtSvpQjSnJJ_PmDQB_VyT5iU)
	- Book: “Deep Learning for Coders with Fastai and PyTorch: AI Applications Without a PhD”: [free on GitHub](https://github.com/fastai/fastbook) or [on Amazon](https://www.amazon.com/Deep-Learning-Coders-fastai-PyTorch/dp/1492045527)
- [Kaggle course “Intro to Machine Learning”](https://www.kaggle.com/learn/intro-to-machine-learning)
- O’Reilly:
	- Courses: [Data/ML engineer](https://learning.oreilly.com/courses/dataml-engineer/)
	- Book: [“Python Machine Learning”](https://learning.oreilly.com/library/view/python-machine-learning/9781789955750/Text/Chapter_1.xhtml#_idParaDest-23)
	- [Playlist](https://learning.oreilly.com/playlists/907fa947-4eba-4c1c-bcbd-9cc5167568d7/)
- [VS Code: “Data Science in VS Code tutorial”](https://code.visualstudio.com/docs/datascience/data-science-tutorial)
- [W3schools Python course](https://www.w3schools.com/python/python_ml_getting_started.asp)
- [“Build your AI Product MVP in less than 24 hours”](https://twitter.com/1littlecoder/status/1580555066791972866)

## People

- [Tom’s Twitter list “AI & ML”](https://twitter.com/i/lists/1577855041150541826)

## Tools

- [Programming language](#programming-language)
- [⚠️ Notebook software](#%EF%B8%8F-notebook-software)
- [⚠️ ML code examples](#%EF%B8%8F-ml-code-examples)
- [Frameworks & libraries](#frameworks--libraries)
- [Models](#models)
- [Datasets](#datasets)

### Programming language

[Python](./Python%20and%20Django.md) is the main programming language for AI/ML.

### ⚠️ Notebook software

For writing/documenting/sharing ML code – essentially word processors with embedded (Python) code blocks. Uses `.ipynb` files, which are JSON structures containing Python code blocks and Markdown text blocks:

- [Jupyter Notebook](https://jupyter.org/): the original (see below)
- [VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks) has built in Jupyter support
- [Google Colab](https://colab.research.google.com/): work with files on Google Drive and GitHub
- [Kaggle](https://www.kaggle.com/)
- [Gradio](https://gradio.app/) for building UI’s inside notebooks
- IPython: interactive Python and Jupyter.
- REPL: interactive Python session. Read, Evaluate, Print and Loop.
		
#### Jupyter Notebook

- Press Tab to get autocompletion suggestions
- Inside the parentheses of a function, pressing Shift + Tab will display signature and description of the function
- `?[function]` to get help on function: `?verify_images`, or `??verify_images` for full source code
- `doc([function])` to get documentation page
- `%debug`: inspect every variable

### ⚠️ ML code examples

- [HuggingFace Spaces](https://huggingface.co/spaces): discover ML apps
- [Kaggle Code](https://www.kaggle.com/code): explore, run, share ML code

### Frameworks & libraries

- [PyTorch](https://pytorch.org/) – open source machine learning framework
- [TensorFlow](https://www.tensorflow.org/) – Google
  - [Keras](https://keras.io/) for deep learning
- [JAX](https://jax.readthedocs.io/en/latest/)
- [FastAI](https://docs.fast.ai/)

#### PyTorch

Libraries:

- **torch**: main library
	- [Introductory neural network tutorial](https://pytorch.org/tutorials/beginner/basics/intro.html)
- **torchaudio**: sound
- **torchtext**: text/NLP
- **torchvision**: images and video
- **torcharrow**: data preprocessing in deep learning
- **TorchData**: data loading primitives for easily constructing flexible and performant data pipelines
- **TorchRec**: recommendations
- **TorchServe**: server
- **TorchX**: job launcher for PyTorch applications

### Models

Collections of models:

- [HuggingFace](https://huggingface.co/models): collection of models, “GitHub for AI models”
- [EleutherAI](https://www.eleuther.ai/): creator of open source AI models
- [OpenAI](https://openai.com/): creator of private/closed source – GPT-3, DALL·E

Some models:

- Text-to-Text:
	- GPT-3: OpenAI
	- GPT-Neo 1.3B: a transformer model designed using EleutherAI’s replication of the GPT-3 architecture.
	- GPT-J 6B: a transformer model trained using Ben Wang's Mesh Transformer JAX.
- Text-to-Image:
	- DALL·E: OpenAI
	- Midjourney
	- Stable Diffusion: Stability AI
	- Imagen: Google
	- Parti: Google
- Text-to-Video:
	- Imagen Video: Google
	- Phenaki: Google
	- Make-a-Video: Meta

### Datasets

- [Kaggle Datasets](https://www.kaggle.com/datasets)
- [Google Dataset Search](https://toolbox.google.com/datasetsearch)
- [Google Scholar](https://scholar.google.com/)
- [UCI Machine Learning Repository](http://mlr.cs.umass.edu/ml/)
- [VisualData](https://www.visualdata.io/)
- [CMU Libraries](https://guides.library.cmu.edu/machine-learning/datasets)
- [The Big Bad NLP Database](https://datasets.quantumstat.com/)
- Lists of datasets:
  - [TowardsAI](https://pub.towardsai.net/best-datasets-for-machine-learning-data-science-computer-vision-nlp-ai-c9541058cf4f)
  - [Image/video/3D datasets (Yulan Guo)](http://yulanguo.me/dataset.html)


## Machine Learning Theory

Machine learning algorithm:

	Inputs + Weights → Model → Results + Loss
	…then adjust Weights

⚠️ ML input data is **always in number format** (with decimals), even though it came from text/image/video/sound. See “Feature engineering” below.

### Terminology

- **Model**: what does the actual predicting; a file that has been trained to recognize certain types of patterns.
- **Features**: model inputs, `x₁`, `x₂`, etc.
- **Label**: model output, `y`, what we want to predict.
- **Example**: one piece of data (features, labeled or unlabeled).
- **Dataset**: a whole collection of examples.
- **Batch**: the set of examples used in one training iteration.
- **Epoch**: number of passes of the entire training dataset the machine learning algorithm has completed.
- **Vector**: an array of numbers.
- **Matrix**: a 2D array of numbers, rows × columns, e.g. 150×4.
- **Tensor**: a specialized data structure that are very similar to arrays and matrices. A tensor interacts with other entities in a system and changes its values when other values change.
- **Slope**: `m`, angle of the line in linear regression.
- **Weight**: `w`, the importance of a feature
- **Bias**: `b`, how well a model matches the training set.
- **Loss**: mismatch with model, *mean square error*.
- **Learning rate**: granularity when training a model
- **Gradient descent**: algorithm for finding minima.
- **Hyperparameters**: the “knobs” that programmers tweak in machine learning algorithms.
- **Deep learning**: artificial neural networks with representation learning.
- **Data augmentation**: creating random variations of our input data so they appear different, but do not actually change the meaning of the data. E.g. image rotation and flipping.
- **Generalization**: a model’s ability to adapt properly to new, previously unseen data.
- **Feature engineering**: transform inputs so they can be used in model.
- **One-hot encoding**: as 1 or 0.
- **Binning**: put category values into “buckets”.
- **Feature crosses**: combine features to create synthetic features.
- **Decision boundaries**: a surface that separates data points belonging to different class labels.
- **Regularization**: reducing complexity of model (e.g. L2).
- **Logistic regression**: output is a *probability* (0.0-1.0).

### Learning types

- **Supervised learning**: labeled data/output
- **Reinforcement learning**: reward signal, e.g. chess engine
- **Unsupervised learning**: hidden structures – clustering, dimensionality reduction

Also: feature learning/representation learning

### Neural networks

Neural networks definitely shine where you have data that is not easily transformable into features – for example images used to be hard to transform into good features.

NN math, simplified: multiply, add them up, replace negatives with zeroes.

- **CNN: Convolutional Neural Network**, a deep learning neural network sketched for processing structured arrays of data such as portrayals.
- **RNN: Recurrent Neural Network**, a class of artificial neural networks where connections between nodes can create a cycle, allowing output from some nodes to affect subsequent input to the same nodes.
- **Transformer**: is a deep learning model that adopts the mechanism of self-attention, differentially weighting the significance of each part of the input data. It is used primarily in the fields of natural language processing (NLP) and computer vision (CV).

### Text processing with Large Language Models (LLM’s)

- **NER:** Named Entity Recognition

### Vector search and Semantic search

- **Vector search**: matching search key’s vectors’ proximity in vector space with other items.
- **Semantic search**: NLP for transforming search phrase into vectors, then vector search for matching their proximity in vector space with other items. These vectors are usually called **embeddings**.
- **Embeddings**: special type of vector that is produced as a result of running an input through an ML model - usually a neural network.
- **Dense retrieval**: using embeddings to search.

## Deployment

There are two main use cases for deploying ML code: **training** and **inference**.

For inference, there are several options:

1. Use your own cloud compute/GPU and have your backend use that.
2. AWS SageMaker Inference service and ping that from your backend.
3. GCP’s ML Inference service (Vertex AI) and ping that from your backend.
4. HuggingFace Inference Endpoints: https://huggingface.co/inference-endpoints

### Deploying on GCP AppEngine

- Create `app.yaml`

		gcloud config set project [app-slug]
		gcloud app deploy app.yaml
		gcloud config set project makamap
		gcloud app browse
		pip freeze > requirements.txt
	
