# AI and Machine Learning

## Lessons

- Google
	- https://developers.google.com/machine-learning/crash-course/ml-intro
	- https://developers.google.com/machine-learning/problem-framing/problem
- FastAI
	- https://course.fast.ai/
- O’Reilly:
	- https://learning.oreilly.com/playlists/907fa947-4eba-4c1c-bcbd-9cc5167568d7/
	- https://learning.oreilly.com/courses/dataml-engineer/
	- https://learning.oreilly.com/library/view/python-machine-learning/9781789955750/Text/Chapter_1.xhtml#_idParaDest-23
- https://twitter.com/1littlecoder/status/1580555066791972866

## Tools

- Models:
	- https://huggingface.co/
	- https://www.eleuther.ai/
- Frameworks:
	- https://pytorch.org/ – open source machine learning framework
	- https://www.tensorflow.org/ – Google
	- FastAI: https://docs.fast.ai/
- Notebooks:
	- https://jupyter.org/
	- https://colab.research.google.com/
	- https://www.kaggle.com/

## Models

- GPT-Neo 1.3B is a transformer model designed using EleutherAI's replication of the GPT-3 architecture
- GPT-J 6B is a transformer model trained using Ben Wang's Mesh Transformer JAX

## Notes

Broadly speaking, we today use ML for:

1. Classification (spam detection etc)
2. Generation (GAN etc)

Deep learning
Neural network: multiply, add them up, replace negatives with zeroes

	Inputs + Weights → Model → Results + Loss, then adjust Weights

### Learning

- Supervised: labeled data/output
- Unsupervised: hidden structures – clustering, dimensionality reduction
- Reinforcement: reward signal, e.g. chess engine

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
- Epoch: number of passes of the entire training dataset the machine learning algorithm has completed
