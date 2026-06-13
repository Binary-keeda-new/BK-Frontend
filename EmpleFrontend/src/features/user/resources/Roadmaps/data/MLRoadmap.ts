/**
 * AI & Machine Learning Roadmap: HYBRID EDITION
 * Includes both '6months' and '6 months' keys for UI compatibility.
 */

// ─── 6-MONTH CURRICULUM DATA ───
const proWeeks6Month = [
  {
    id: 1,
    week: 'Week 1',
    title: 'Python for Data Science',
    points: 50,
    objectives: [
      'Master Python syntax and data structures',
      'Use NumPy for numerical computing',
      'Work with Pandas DataFrames'
    ],
    content: `<h3>Python Foundations</h3><p>Python is the primary language of ML. You need to be fluent in Python before touching any ML library.</p><h4>Key Libraries:</h4><ul><li><strong>NumPy:</strong> N-dimensional arrays, vectorized operations</li><li><strong>Pandas:</strong> DataFrames for data manipulation and analysis</li><li><strong>Matplotlib/Seaborn:</strong> Data visualization</li></ul>`,
    resources: {
      websites: [
        { title: 'NumPy Official Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html' },
        { title: 'Kaggle Python Course (Free)', url: 'https://www.kaggle.com/learn/python' }
      ],
      videos: [
        { title: 'Python for Data Science — freeCodeCamp', url: 'https://www.youtube.com/embed/LHBE6Q9XlzI', dur: '12 hr' },
        { title: 'Pandas Tutorial — Corey Schafer', url: 'https://www.youtube.com/embed/ZyhVh-qRZPA', dur: '4 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w1-e1',
          question: 'Which Python library is primarily used to work with labeled tabular data structures?',
          type: 'mcq',
          options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
          ans: 1
        },
        {
          id: 'ml-6m-w1-e2',
          question: 'In NumPy, array elements must all be of the same data type.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-6m-w1-m1',
          question: 'Which of the following are valid ways to create a Pandas DataFrame? (Select all that apply)',
          type: 'msq',
          options: ['From a dictionary of lists', 'From a list of dictionaries', 'From a 2D NumPy array', 'From a simple string variable'],
          ans: [0, 1, 2]
        },
        {
          id: 'ml-6m-w1-m2',
          question: 'What is the output of `np.array([1, 2, 3]) * 2`?',
          type: 'mcq',
          options: ['[1, 2, 3, 1, 2, 3]', '[2, 4, 6]', 'Error', '[3, 4, 5]'],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w1-h1',
          question: 'Identify the correct method in Pandas to fill NaN values with a specific constant.',
          type: 'mcq',
          options: ['df.replace_nan(val)', 'df.fillna(val)', 'df.clean_nulls(val)', 'df.dropna()'],
          ans: 1
        },
        {
          id: 'ml-6m-w1-h2',
          question: 'Which NumPy function is used to change the shape of an array without changing its data?',
          type: 'mcq',
          options: ['np.resize()', 'np.reshape()', 'np.transpose()', 'np.flatten()'],
          ans: 1
        }
      ]
    }
  },
  {
    id: 2,
    week: 'Week 2',
    title: 'Mathematics for ML',
    points: 50,
    objectives: [
      'Understand linear algebra for ML',
      'Learn calculus fundamentals (gradients)',
      'Study probability and statistics basics'
    ],
    content: `<h3>Math You Actually Need</h3><p>You don't need a PhD — but you need intuition for these topics.</p><h4>Linear Algebra:</h4><ul><li>Vectors, matrices, matrix multiplication</li><li>Dot products, eigenvalues, SVD</li></ul><h4>Calculus:</h4><ul><li>Derivatives and gradients — the heart of backpropagation</li><li>Chain rule, partial derivatives</li></ul><h4>Statistics:</h4><ul><li>Mean, variance, standard deviation</li><li>Probability distributions, Bayes theorem</li></ul>`,
    resources: {
      websites: [
        { title: 'Khan Academy Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra' }
      ],
      videos: [
        { title: 'Linear Algebra for ML — freeCodeCamp', url: 'https://www.youtube.com/watch?v=QCPJ0VdpM00', dur: '3 hr' },
        { title: 'Statistics for ML — StatQuest', url: 'https://www.youtube.com/embed/qBigTkBLU6g', dur: 'Playlist' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w2-e1',
          question: 'What mathematical operation is at the core of backpropagation in neural networks?',
          type: 'mcq',
          options: ['Integration', 'The chain rule (derivatives)', 'Matrix inversion', 'Fourier transform'],
          ans: 1
        },
        {
          id: 'ml-6m-w2-e2',
          question: 'The dot product of two orthogonal (perpendicular) vectors is always zero.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-6m-w2-m1',
          question: 'Which of the following describe eigenvalues and eigenvectors? (Select all that apply)',
          type: 'msq',
          options: [
            'An eigenvector changes only by a scalar factor when a linear transformation is applied',
            'The scaling factor is the eigenvalue',
            'Every matrix has exactly one eigenvector',
            'They are used in Principal Component Analysis (PCA)'
          ],
          ans: [0, 1, 3]
        },
        {
          id: 'ml-6m-w2-m2',
          question: 'In probability, Bayes\' Theorem is used to calculate what?',
          type: 'mcq',
          options: ['Joint probability', 'Conditional probability', 'Independent probability', 'Marginal probability'],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w2-h1',
          question: 'What is the gradient of a multi-variable function?',
          type: 'mcq',
          options: [
            'A scalar representing the average value of the function',
            'A vector of partial derivatives pointing in the direction of greatest rate of increase of the function',
            'The second derivative of the function',
            'A constant value that is always positive'
          ],
          ans: 1
        },
        {
          id: 'ml-6m-w2-h2',
          question: 'If a variable follows a standard normal distribution, what are its mean and standard deviation?',
          type: 'mcq',
          options: ['mean = 1, std = 0', 'mean = 0, std = 1', 'mean = 0, std = 0', 'mean = 1, std = 1'],
          ans: 1
        }
      ]
    }
  },
  {
    id: 3,
    week: 'Week 3',
    title: 'Machine Learning Fundamentals',
    points: 60,
    objectives: [
      'Understand supervised vs unsupervised learning',
      'Learn the ML workflow (train/val/test split)',
      'Master bias-variance tradeoff'
    ],
    content: `<h3>Core ML Concepts</h3><h4>Types of Learning:</h4><ul><li><strong>Supervised:</strong> Labeled data — regression, classification</li><li><strong>Unsupervised:</strong> No labels — clustering, dimensionality reduction</li><li><strong>Reinforcement:</strong> Learn from rewards and penalties</li></ul><h4>ML Workflow:</h4><ul><li>Data collection → EDA → preprocessing → model → evaluation → deployment</li></ul><h4>Evaluation Metrics:</h4><ul><li>Regression: MSE, RMSE, MAE, R²</li><li>Classification: Accuracy, Precision, Recall, F1, AUC-ROC</li></ul>`,
    resources: {
      websites: [
        { title: 'Scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html' }
      ],
      videos: [
        { title: 'Machine Learning for Everybody - freeCodeCamp)', url: 'https://www.youtube.com/watch?v=i_LwzRVP7bg', dur: 'Course' },
        { title: 'ML Fundamentals — StatQuest', url: 'https://www.youtube.com/embed/Gv9_4yMHFhI', dur: 'Playlist' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w3-e1',
          question: 'Which metric is best suited for assessing a classifier on a highly imbalanced dataset?',
          type: 'mcq',
          options: ['Accuracy', 'F1 Score', 'Mean Squared Error', 'R-squared'],
          ans: 1
        },
        {
          id: 'ml-6m-w3-e2',
          question: 'Supervised learning algorithms do not require labeled training data.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'ml-6m-w3-m1',
          question: 'Which of the following indicate that a model is overfitting (high variance)? (Select all that apply)',
          type: 'msq',
          options: [
            'Very high accuracy on training data, but poor accuracy on validation data',
            'High error on both training and test data',
            'Model has learned noise in the training set',
            'Model is too simple'
          ],
          ans: [0, 2]
        },
        {
          id: 'ml-6m-w3-m2',
          question: 'What is the purpose of the validation dataset in ML?',
          type: 'mcq',
          options: [
            'To train the model weights',
            'To tune hyperparameters and prevent overfitting',
            'To perform final model evaluation after deployment',
            'To clean missing data'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w3-h1',
          question: 'What is the bias-variance tradeoff?',
          type: 'mcq',
          options: [
            'Decreasing bias always decreases variance',
            'Models with high bias have low complexity and underfit; models with high variance have high complexity and overfit',
            'A trade-off between model speed and memory consumption',
            'A method to balance positive and negative labels in classification'
          ],
          ans: 1
        },
        {
          id: 'ml-6m-w3-h2',
          question: 'What is the difference between Precision and Recall?',
          type: 'mcq',
          options: [
            'Precision is TP / (TP+FP); Recall is TP / (TP+FN)',
            'Precision is TP / (TP+FN); Recall is TP / (TP+FP)',
            'Precision measures regression; Recall measures classification',
            'They are identical metrics'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 4,
    week: 'Week 4',
    title: 'Linear & Logistic Regression',
    points: 60,
    objectives: [
      'Implement linear regression from scratch',
      'Understand logistic regression for classification',
      'Apply regularization (L1, L2)'
    ],
    content: `<h3>Regression Models</h3><p>These are the building blocks of ML. Understanding them deeply gives you intuition for more complex models.</p><h4>Linear Regression:</h4><p>Models the relationship between input features and a continuous output using the equation y = wx + b. Trained by minimizing MSE using gradient descent.</p><h4>Logistic Regression:</h4><p>Despite the name, it's a classification algorithm. Uses the sigmoid function to output probabilities between 0 and 1.</p><h4>Regularization:</h4><ul><li><strong>L1 (Lasso):</strong> Adds absolute value of weights — produces sparse models</li><li><strong>L2 (Ridge):</strong> Adds squared weights — prevents large coefficients</li></ul>`,
    resources: {
      websites: [
        { title: 'Sklearn Linear Models', url: 'https://scikit-learn.org/stable/modules/linear_model.html' },
        { title: 'Regularization Explained — Towards Data Science', url: 'https://towardsdatascience.com/regularization-in-machine-learning-76441ddcf99a' }
      ],
      videos: [
        { title: 'Linear Regression — StatQuest', url: 'https://www.youtube.com/embed/7ArmBVF2dCs', dur: '25 min' },
        { title: 'Logistic Regression — StatQuest', url: 'https://www.youtube.com/embed/yIYKR4sgzI8', dur: '19 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w4-e1',
          question: 'Which regularization technique can set weights exactly to zero, serving as feature selection?',
          type: 'mcq',
          options: ['L2 Regularization (Ridge)', 'L1 Regularization (Lasso)', 'ElasticNet', 'Dropout'],
          ans: 1
        },
        {
          id: 'ml-6m-w4-e2',
          question: 'Logistic Regression is used for predicting continuous values.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'ml-6m-w4-m1',
          question: 'What activation function does Logistic Regression use to output values between 0 and 1?',
          type: 'mcq',
          options: ['ReLU', 'Sigmoid', 'Tanh', 'Leaky ReLU'],
          ans: 1
        },
        {
          id: 'ml-6m-w4-m2',
          question: 'Which of the following are cost functions used in regression? (Select all that apply)',
          type: 'msq',
          options: ['Mean Squared Error (MSE)', 'Binary Cross-Entropy', 'Mean Absolute Error (MAE)', 'Categorical Cross-Entropy'],
          ans: [0, 2]
        }
      ],
      hard: [
        {
          id: 'ml-6m-w4-h1',
          question: 'What does multicollinearity mean in multiple linear regression?',
          type: 'mcq',
          options: [
            'Independent variables are highly correlated with each other, making coefficient estimation unstable',
            'The dependent variable is highly correlated with the independent variable',
            'The residuals are not normally distributed',
            'The model has too many training features'
          ],
          ans: 0
        },
        {
          id: 'ml-6m-w4-h2',
          question: 'How does gradient descent update parameters in Linear Regression?',
          type: 'mcq',
          options: [
            'w = w - learning_rate * dLoss/dw',
            'w = w + learning_rate * dLoss/dw',
            'w = w * learning_rate',
            'w = w / dLoss/dw'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 5,
    week: 'Week 5',
    title: 'Decision Trees, Random Forests & Boosting',
    points: 60,
    objectives: [
      'Understand decision tree splitting criteria',
      'Build ensemble models with Random Forest',
      'Use XGBoost for competition-level performance'
    ],
    content: `<h3>Tree-based Models</h3><p>Tree models are among the most powerful for structured/tabular data and are used extensively in industry and ML competitions.</p><h4>Decision Trees:</h4><p>Split data based on feature thresholds to create a tree of decisions. Prone to overfitting when deep.</p><h4>Random Forest:</h4><p>Ensemble of many decision trees trained on random subsets of data and features. Reduces overfitting through averaging.</p><h4>Gradient Boosting (XGBoost/LightGBM):</h4><p>Builds trees sequentially, each correcting the errors of the previous. Consistently wins Kaggle competitions on tabular data.</p>`,
    resources: {
      websites: [
        { title: 'XGBoost Documentation', url: 'https://xgboost.readthedocs.io' }
      ],
      videos: [
        { title: 'Decision Trees — StatQuest', url: 'https://www.youtube.com/embed/7VeUPuFGJHk', dur: '18 min' },
        { title: 'Random Forest — StatQuest', url: 'https://www.youtube.com/embed/J4Wdy0Wc_xQ', dur: '9 min' },
        { title: 'XGBoost — StatQuest', url: 'https://www.youtube.com/embed/OtD8wVaFm6E', dur: '25 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w5-e1',
          question: 'Random Forest reduces overfitting by averaging predictions from many independent decision trees.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        },
        {
          id: 'ml-6m-w5-e2',
          question: 'Which ensemble method builds models sequentially where each model corrects the errors of the previous one?',
          type: 'mcq',
          options: ['Bagging', 'Boosting', 'Stacking', 'Voting'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'ml-6m-w5-m1',
          question: 'What are the two common metrics used to evaluate splits in classification decision trees? (Select all that apply)',
          type: 'msq',
          options: ['Gini Impurity', 'Entropy', 'R-squared', 'Mean Absolute Error'],
          ans: [0, 1]
        },
        {
          id: 'ml-6m-w5-m2',
          question: 'What is bagging (Bootstrap Aggregating) in Random Forest?',
          type: 'mcq',
          options: [
            'Training models on different features only',
            'Training models on random subsets of data with replacement',
            'Pruning trees to be shallow',
            'Sorting trees by performance'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w5-h1',
          question: 'What is a key difference between Random Forest (RF) and Gradient Boosting Machines (GBM)?',
          type: 'mcq',
          options: [
            'RF trees are built independently in parallel; GBM trees are built sequentially',
            'RF is only for classification; GBM is only for regression',
            'RF uses boosting; GBM uses bagging',
            'RF has no hyperparameters to tune'
          ],
          ans: 0
        },
        {
          id: 'ml-6m-w5-h2',
          question: 'In a decision tree, if Gini Impurity of a node is 0, it means what?',
          type: 'mcq',
          options: [
            'The node is completely pure (all samples belong to a single class)',
            'The node contains an equal mix of all classes',
            'The node cannot be split further',
            'The model has errored'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 6,
    week: 'Week 6',
    title: 'Unsupervised Learning',
    points: 60,
    objectives: [
      'Apply K-Means and hierarchical clustering',
      'Reduce dimensions with PCA and t-SNE',
      'Detect anomalies in datasets'
    ],
    content: `<h3>Unsupervised Learning</h3><p>When you don't have labels, unsupervised algorithms find patterns and structure in data.</p><h4>Clustering:</h4><ul><li><strong>K-Means:</strong> Partition data into K clusters by minimizing intra-cluster variance</li><li><strong>DBSCAN:</strong> Density-based clustering, handles arbitrary shapes</li><li><strong>Hierarchical:</strong> Build a dendrogram of nested clusters</li></ul><h4>Dimensionality Reduction:</h4><ul><li><strong>PCA:</strong> Projects data onto principal components — linear method</li><li><strong>t-SNE:</strong> Non-linear 2D/3D visualization of high-dimensional data</li></ul>`,
    resources: {
      websites: [
        { title: 'Unsupervised Learning Guide — Towards Data Science', url: 'https://towardsdatascience.com/unsupervised-learning-techniques-using-python-k-means-and-principal-component-analysis-c360d99e1c37' }
      ],
      videos: [
        { title: 'K-Means Clustering — StatQuest', url: 'https://www.youtube.com/embed/4b5d3muPQmA', dur: '9 min' },
        { title: 'PCA Step by Step — StatQuest', url: 'https://www.youtube.com/embed/FgakZw6K1QQ', dur: '21 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w6-e1',
          question: 'What does PCA stand for?',
          type: 'mcq',
          options: ['Principal Component Analysis', 'Primary Cluster Algorithm', 'Predictive Classification Algorithm', 'Probabilistic Cluster Analysis'],
          ans: 0
        },
        {
          id: 'ml-6m-w6-e2',
          question: 'K-Means is a supervised classification algorithm.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'ml-6m-w6-m1',
          question: 'Which of the following are characteristics of DBSCAN clustering? (Select all that apply)',
          type: 'msq',
          options: [
            'Requires specifying the number of clusters (K) in advance',
            'Can identify noise/outliers automatically',
            'Can find clusters of arbitrary shapes',
            'Is density-based'
          ],
          ans: [1, 2, 3]
        },
        {
          id: 'ml-6m-w6-m2',
          question: 'What is a key difference between PCA and t-SNE?',
          type: 'mcq',
          options: [
            'PCA is a linear technique; t-SNE is a non-linear technique',
            'PCA is only for clustering; t-SNE is for classification',
            'PCA is supervised; t-SNE is unsupervised',
            'They are exactly the same'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: 'ml-6m-w6-h1',
          question: 'How do you determine the optimal number of clusters in K-Means?',
          type: 'mcq',
          options: [
            'Using the elbow method or silhouette score',
            'By dividing the number of records by 10',
            'By looking at the model accuracy',
            'K-Means always finds the optimal number automatically'
          ],
          ans: 0
        },
        {
          id: 'ml-6m-w6-h2',
          question: 'What are the principal components in PCA?',
          type: 'mcq',
          options: [
            'Orthogonal axes representing the directions of maximum variance in the data',
            'The most important data features selected directly from the dataset',
            'The clusters found by the algorithm',
            'The model weights'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 7,
    week: 'Week 7',
    title: 'Neural Networks Fundamentals',
    points: 70,
    objectives: [
      'Understand perceptrons and multi-layer networks',
      'Implement backpropagation conceptually',
      'Build your first neural network with PyTorch'
    ],
    content: `<h3>Neural Networks</h3><p>Neural networks are inspired by the human brain. They consist of layers of interconnected nodes (neurons) that learn complex patterns through training.</p><h4>Architecture:</h4><ul><li><strong>Input Layer:</strong> Raw features</li><li><strong>Hidden Layers:</strong> Learned representations</li><li><strong>Output Layer:</strong> Predictions</li><li><strong>Activation Functions:</strong> ReLU, Sigmoid, Tanh, Softmax</li></ul><h4>Backpropagation:</h4><p>The algorithm that trains neural networks by computing gradients of the loss with respect to each weight using the chain rule.</p>`,
    resources: {
      websites: [
        { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/beginner/basics/intro.html' }
      ],
      videos: [
        { title: 'Neural Networks from Scratch — Sentdex', url: 'https://www.youtube.com/embed/Wo5dMEP_BbI', dur: 'Playlist' },
        { title: 'Neural Networks — 3Blue1Brown', url: 'https://www.youtube.com/embed/aircAruvnKk', dur: 'Playlist' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w7-e1',
          question: 'Which activation function is most commonly used in the hidden layers of modern deep networks to avoid vanishing gradients?',
          type: 'mcq',
          options: ['Sigmoid', 'ReLU', 'Softmax', 'Step Function'],
          ans: 1
        },
        {
          id: 'ml-6m-w7-e2',
          question: 'Backpropagation is used to update the weights of a neural network by computing the gradients of the loss function.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-6m-w7-m1',
          question: 'Which activation function is most appropriate for the output layer of a multi-class classification problem?',
          type: 'mcq',
          options: ['ReLU', 'Sigmoid', 'Softmax', 'Leaky ReLU'],
          ans: 2
        },
        {
          id: 'ml-6m-w7-m2',
          question: 'Which of the following are hyperparameters in a neural network? (Select all that apply)',
          type: 'msq',
          options: ['Learning rate', 'Number of hidden layers', 'Weights and Biases', 'Batch size'],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'ml-6m-w7-h1',
          question: 'What is the vanishing gradient problem in deep neural networks?',
          type: 'mcq',
          options: [
            'Gradients become extremely small during backpropagation, causing weights in early layers to stop updating',
            'Gradients grow exponentially, causing numerical overflow',
            'The loss function goes to zero too quickly',
            'Weights are set to zero by regularization'
          ],
          ans: 0
        },
        {
          id: 'ml-6m-w7-h2',
          question: 'In PyTorch, which command computes the gradients of the loss with respect to model parameters?',
          type: 'mcq',
          options: ['loss.backward()', 'optimizer.step()', 'model.forward()', 'optimizer.zero_grad()'],
          ans: 0
        }
      ]
    }
  },
  {
    id: 8,
    week: 'Week 8',
    title: 'Convolutional Neural Networks (CNNs)',
    points: 70,
    objectives: [
      'Understand conv layers, pooling, and feature maps',
      'Build image classifiers with CNNs',
      'Use transfer learning with pretrained models'
    ],
    content: `<h3>CNNs for Computer Vision</h3><p>CNNs are specialized neural networks for processing grid-like data (images). They use convolutional layers to automatically learn spatial hierarchies of features.</p><h4>Key Operations:</h4><ul><li><strong>Convolution:</strong> Slide a filter across the image to detect features</li><li><strong>Pooling:</strong> Reduce spatial dimensions (MaxPool, AvgPool)</li><li><strong>Batch Normalization:</strong> Stabilize training</li></ul><h4>Transfer Learning:</h4><p>Use pretrained models (ResNet, VGG, EfficientNet) trained on ImageNet and fine-tune for your task. Dramatically reduces training time and data needed.</p>`,
    resources: {
      websites: [
        { title: 'PyTorch CNN Tutorial', url: 'https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html' }
      ],
      videos: [
        { title: 'CNNs Explained — 3Blue1Brown', url: 'https://www.youtube.com/embed/KuXjwB4LzSA', dur: '10 min' },
        { title: 'Convolutional Neural Networks — deeplearning.ai', url: 'https://www.youtube.com/embed/ArPaAX_PhIs', dur: 'Playlist' },
        { title: 'Transfer Learning — Sentdex', url: 'https://www.youtube.com/embed/OO4HD-1wRN8', dur: '30 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w8-e1',
          question: 'What is the primary purpose of pooling layers (e.g. MaxPool) in a CNN?',
          type: 'mcq',
          options: ['Increase image resolution', 'Reduce spatial dimensions', 'Add parameters', 'Change channels'],
          ans: 1
        },
        {
          id: 'ml-6m-w8-e2',
          question: 'Transfer learning allows using a model trained on a large dataset (like ImageNet) for a different task.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-6m-w8-m1',
          question: 'Which of the following are advantages of CNNs over fully connected networks for image data? (Select all that apply)',
          type: 'msq',
          options: [
            'Parameter sharing',
            'Local connectivity (exploiting spatial structure)',
            'Lower memory usage for large images',
            'Do not require backpropagation'
          ],
          ans: [0, 1, 2]
        },
        {
          id: 'ml-6m-w8-m2',
          question: 'What does "stride" mean in a convolutional layer?',
          type: 'mcq',
          options: [
            'The size of the filter',
            'The number of pixels the filter shifts at each step',
            'The padding added around the input border',
            'The height of the input image'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w8-h1',
          question: 'If you apply a 3x3 filter with no padding and a stride of 1 to a 28x28 image, what is the output size?',
          type: 'mcq',
          options: ['28x28', '26x26', '30x30', '25x25'],
          ans: 1
        },
        {
          id: 'ml-6m-w8-h2',
          question: 'Which CNN architecture introduced residual connections to allow training extremely deep networks (e.g. 152 layers)?',
          type: 'mcq',
          options: ['AlexNet', 'VGG', 'ResNet', 'LeNet'],
          ans: 2
        }
      ]
    }
  },
  {
    id: 9,
    week: 'Week 9',
    title: 'Recurrent Neural Networks & LSTMs',
    points: 70,
    objectives: [
      'Understand sequential data processing',
      'Build RNN and LSTM networks',
      'Apply to time series and text data'
    ],
    content: `<h3>RNNs for Sequential Data</h3><p>RNNs are designed for sequential data — text, time series, audio. They maintain a hidden state that acts as memory of previous inputs.</p><h4>LSTM (Long Short-Term Memory):</h4><p>Solves the vanishing gradient problem in vanilla RNNs. Has gates (input, forget, output) that control what information to keep or discard.</p><h4>GRU:</h4><p>Simplified version of LSTM with fewer parameters — often comparable performance.</p>`,
    resources: {
      websites: [
        { title: 'Sequence Models — deeplearning.ai', url: 'https://www.coursera.org/learn/nlp-sequence-models' }
      ],
      videos: [
        { title: 'RNN — StatQuest', url: 'https://www.youtube.com/embed/AsNTP8Kwu80', dur: '16 min' },
        { title: 'LSTM — StatQuest', url: 'https://www.youtube.com/embed/YCzL96nL7j0', dur: '23 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w9-e1',
          question: 'What problem do LSTMs primarily solve compared to standard recurrent neural networks (RNNs)?',
          type: 'mcq',
          options: ['Overfitting', 'Vanishing/Exploding gradients in long sequences', 'Slow inference speed', 'High memory usage'],
          ans: 1
        },
        {
          id: 'ml-6m-w9-e2',
          question: 'RNNs are particularly suited for tabular classification datasets.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'ml-6m-w9-m1',
          question: 'Which of the following are gates present in an LSTM cell? (Select all that apply)',
          type: 'msq',
          options: ['Forget Gate', 'Input Gate', 'Output Gate', 'ReLU Gate'],
          ans: [0, 1, 2]
        },
        {
          id: 'ml-6m-w9-m2',
          question: 'What is a GRU (Gated Recurrent Unit)?',
          type: 'mcq',
          options: [
            'A version of LSTM with no gates',
            'A simplified variation of LSTM with fewer parameters and gates',
            'A convolutional network architecture',
            'A reinforcement learning agent'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w9-h1',
          question: 'What is the role of the Forget Gate in an LSTM?',
          type: 'mcq',
          options: [
            'It resets all weights in the network',
            'It decides what information to discard from the cell state',
            'It stops training when accuracy reaches 100%',
            'It resets the learning rate'
          ],
          ans: 1
        },
        {
          id: 'ml-6m-w9-h2',
          question: 'In many-to-one sequence modeling, what is the structure of the input and output?',
          type: 'mcq',
          options: [
            'Input is a sequence (e.g. movie review); output is a single label (e.g. sentiment classification)',
            'Input is a single image; output is a sequence of words',
            'Both input and output are sequences of equal length',
            'None of the above'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 10,
    week: 'Week 10',
    title: 'Natural Language Processing (NLP)',
    points: 70,
    objectives: [
      'Preprocess text data (tokenization, stemming)',
      'Use word embeddings (Word2Vec, GloVe)',
      'Build text classification models'
    ],
    content: `<h3>NLP Fundamentals</h3><p>NLP is the branch of ML that deals with human language — text and speech.</p><h4>Text Preprocessing:</h4><ul><li>Tokenization, lowercasing, punctuation removal</li><li>Stopword removal, stemming, lemmatization</li><li>TF-IDF vectorization</li></ul><h4>Word Embeddings:</h4><p>Dense vector representations of words that capture semantic meaning. Similar words have similar vectors. Word2Vec, GloVe, FastText.</p>`,
    resources: {
      websites: [
        { title: 'NLTK Official Documentation', url: 'https://www.nltk.org' },
        { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1' }
      ],
      videos: [
        { title: 'Complete NLP Machine Learning — Krish Naik', url: 'https://www.youtube.com/watch?v=ENLEjGozrio', dur: '3 hr 53 min 11 sec' },
        { title: 'Word2Vec — StatQuest', url: 'https://www.youtube.com/embed/viZrOnJclY0', dur: '16 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w10-e1',
          question: 'What are word embeddings?',
          type: 'mcq',
          options: ['Images of words', 'Dense vector representations of words capturing semantic meaning', 'Compressed string formats', 'List of all words in a dictionary'],
          ans: 1
        },
        {
          id: 'ml-6m-w10-e2',
          question: 'Stemming and lemmatization both reduce words to their base or root form.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-6m-w10-m1',
          question: 'Which of the following are common steps in text preprocessing? (Select all that apply)',
          type: 'msq',
          options: ['Tokenization', 'Stopword removal', 'Standard scaling', 'Lowercasing'],
          ans: [0, 1, 3]
        },
        {
          id: 'ml-6m-w10-m2',
          question: 'What does TF-IDF measure?',
          type: 'mcq',
          options: [
            'Word similarity in a vector space',
            'How important a word is to a document relative to a collection of documents',
            'The accuracy of a sequence model',
            'The speed of text tokenization'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w10-h1',
          question: 'What is a key difference between stemming and lemmatization?',
          type: 'mcq',
          options: [
            'Stemming chops off characters crudely; lemmatization uses vocabulary and morphological analysis to return valid dictionary words',
            'Stemming is only for English; lemmatization is for all languages',
            'Stemming is supervised; lemmatization is unsupervised',
            'There is no difference'
          ],
          ans: 0
        },
        {
          id: 'ml-6m-w10-h2',
          question: 'Word2Vec creates embeddings using which two main training architectures?',
          type: 'mcq',
          options: ['CNN and RNN', 'CBOW (Continuous Bag of Words) and Skip-gram', 'Encoder and Decoder', 'TF and IDF'],
          ans: 1
        }
      ]
    }
  },
  {
    id: 11,
    week: 'Week 11',
    title: 'Model Deployment with FastAPI & Streamlit',
    points: 80,
    objectives: [
      'Save and load trained models',
      'Build REST APIs for ML models with FastAPI',
      'Create interactive ML demos with Streamlit'
    ],
    content: `<h3>Deploying ML Models</h3><p>A model that isn't deployed is just research. This week you learn to ship your models as production services.</p><h4>FastAPI:</h4><p>Modern Python web framework for building ML APIs. Automatic documentation, fast, type-safe.</p><h4>Streamlit:</h4><p>Build interactive data apps and ML demos with pure Python — no frontend knowledge needed.</p><h4>Model Serving:</h4><ul><li>Save models with joblib (sklearn) or torch.save (PyTorch)</li><li>Load and run inference in the API</li><li>Handle preprocessing in the serving pipeline</li></ul>`,
    resources: {
      websites: [
        { title: 'FastAPI Official Docs', url: 'https://fastapi.tiangolo.com' },
        { title: 'Streamlit Docs', url: 'https://docs.streamlit.io' }
      ],
      videos: [
        { title: 'FastAPI ML Deployment — Krish Naik', url: 'https://www.youtube.com/embed/b5F667g1yCk', dur: '1 hr' },
        { title: 'Streamlit Full Course — freeCodeCamp', url: 'https://www.youtube.com/embed/JwSS70SZdyM', dur: '2 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w11-e1',
          question: 'Which tool allows building interactive data applications in pure Python without HTML/CSS/JS knowledge?',
          type: 'mcq',
          options: ['Flask', 'FastAPI', 'Streamlit', 'Django'],
          ans: 2
        },
        {
          id: 'ml-6m-w11-e2',
          question: 'FastAPI automatically generates interactive Swagger API documentation.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-6m-w11-m1',
          question: 'Which of the following libraries can be used to serialize/save trained Python ML models? (Select all that apply)',
          type: 'msq',
          options: ['pickle', 'joblib', 'matplotlib', 'pandas'],
          ans: [0, 1]
        },
        {
          id: 'ml-6m-w11-m2',
          question: 'What is the primary Python server gateway used to run FastAPI applications?',
          type: 'mcq',
          options: ['Gunicorn', 'Uvicorn', 'Apache', 'Nginx'],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w11-h1',
          question: 'What is model serialization and why is it required in production pipelines?',
          type: 'mcq',
          options: [
            'Converting the training data into binary format to save database space',
            'Saving a model object (including its parameters) to a file so it can be loaded later for inference without retraining',
            'Encrypting the model weights for security',
            'Generating test cases for the API'
          ],
          ans: 1
        },
        {
          id: 'ml-6m-w11-h2',
          question: 'In FastAPI, how do you specify that an API route accepts POST requests containing a structured JSON body?',
          type: 'mcq',
          options: [
            'By using a Pydantic model class to type-hint the input parameter',
            'By parsing a query parameter string',
            'By writing custom SQL injection checks',
            'FastAPI route parameters are always simple integers'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 12,
    week: 'Week 12',
    title: 'MLOps & Production ML',
    points: 80,
    objectives: [
      'Track experiments with MLflow',
      'Build ML pipelines',
      'Monitor model performance in production'
    ],
    content: `<h3>MLOps Fundamentals</h3><p>MLOps applies DevOps practices to ML — making the ML lifecycle repeatable, scalable, and maintainable.</p><h4>Key Tools:</h4><ul><li><strong>MLflow:</strong> Experiment tracking, model registry</li><li><strong>DVC:</strong> Data version control</li><li><strong>Weights & Biases:</strong> Experiment tracking and visualization</li><li><strong>Docker:</strong> Containerize ML environments</li></ul><h4>ML Pipeline:</h4><p>Automate the steps from raw data to deployed model: ingestion → preprocessing → training → evaluation → deployment → monitoring.</p>`,
    resources: {
      websites: [
        { title: 'MLflow Official Docs', url: 'https://mlflow.org/docs/latest/index.html' }
      ],
      videos: [
        { title: 'MLflow Tutorial — freeCodeCamp', url: 'https://www.youtube.com/embed/859OxXrt_TI', dur: '3 hr' },
        { title: 'MLOps Course — DataTalks.Club', url: 'https://www.youtube.com/embed/s0uaFZSzwfI', dur: 'Course' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w12-e1',
          question: 'What does MLflow primarily help with?',
          type: 'mcq',
          options: ['Data scraping', 'Experiment tracking and model registry', 'Frontend CSS layout styling', 'Database indexing'],
          ans: 1
        },
        {
          id: 'ml-6m-w12-e2',
          question: 'Docker containerization helps solve the "works on my machine" problem by bundling the application and all dependencies.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-6m-w12-m1',
          question: 'Which of the following are key components of MLOps? (Select all that apply)',
          type: 'msq',
          options: ['Data version control', 'Continuous integration & continuous deployment (CI/CD)', 'Model monitoring and drift detection', 'Designing web logos'],
          ans: [0, 1, 2]
        },
        {
          id: 'ml-6m-w12-m2',
          question: 'What is data drift in production ML?',
          type: 'mcq',
          options: [
            'A bug in data serialization',
            'Changes in the statistical properties of input data over time, leading to degraded model performance',
            'Saving data to cloud storage',
            'Deleting old datasets'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'ml-6m-w12-h1',
          question: 'What is the main purpose of DVC (Data Version Control)?',
          type: 'mcq',
          options: [
            'To version large files, datasets, and ML models in Git without storing the actual binaries in Git repositories',
            'To write unit tests for ML models',
            'To track code changes',
            'To query databases faster'
          ],
          ans: 0
        },
        {
          id: 'ml-6m-w12-h2',
          question: 'In an ML pipeline, why is a model registry used?',
          type: 'mcq',
          options: [
            'To store trained models, version them, and manage their stage transitions (e.g. Staging, Production)',
            'To count the number of users accessing the model',
            'To write documentation',
            'To monitor hardware CPU usage'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 13,
    week: 'Weeks 13-16',
    title: 'Deep Learning Projects & Specialization',
    points: 100,
    objectives: [
      'Complete 2 end-to-end ML projects',
      'Choose a specialization: CV, NLP, or tabular',
      'Compete on Kaggle'
    ],
    content: `<h3>Project Phase</h3><p>The best way to learn ML is by doing. Build real projects, compete on Kaggle, and develop your specialization.</p><h4>Project Ideas:</h4><ul><li>Image classification (skin disease detector)</li><li>Sentiment analysis of product reviews</li><li>House price prediction (Kaggle competition)</li><li>Recommendation system</li><li>Time series forecasting</li></ul><h4>Kaggle:</h4><p>Enter competitions, study top kernels, and earn your first medals. A Kaggle profile with medals is highly respected by employers.</p>`,
    resources: {
      websites: [
        { title: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions' },
        { title: 'Fast.ai Practical Deep Learning (Free)', url: 'https://course.fast.ai' }
      ],
      videos: [
        { title: 'Kaggle Tips — Rob Mulla', url: 'https://www.youtube.com/embed/GJBOMWpLpTQ', dur: '30 min' },
        { title: 'End To End Machine Learning Project Implementation — Krish Naik', url: 'https://www.youtube.com/watch?v=MJ1vWb1rGwM', dur: '2 hr 45 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-6m-w13-e1',
          question: 'Kaggle is primarily a community platform offering ML datasets, competitions, and notebook hosting.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        },
        {
          id: 'ml-6m-w13-e2',
          question: 'Which of the following is a classic machine learning project?',
          type: 'mcq',
          options: ['An static HTML website', 'A regression model to predict housing prices', 'A REST API database query', 'A css stylesheet'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'ml-6m-w13-m1',
          question: 'Which of the following should be included in a professional ML portfolio project README? (Select all that apply)',
          type: 'msq',
          options: [
            'Problem statement and business impact',
            'Data source and exploratory analysis (EDA)',
            'Model description, evaluation metrics, and validation results',
            'Detailed logs of all personal coding sessions'
          ],
          ans: [0, 1, 2]
        },
        {
          id: 'ml-6m-w13-m2',
          question: 'What is a recommender system?',
          type: 'mcq',
          options: [
            'An algorithm that suggests items to users based on preferences (e.g. Netflix, Amazon)',
            'A code linter',
            'A model deployment platform',
            'A database backup script'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: 'ml-6m-w13-h1',
          question: 'What is collaborative filtering in recommender systems?',
          type: 'mcq',
          options: [
            'Filtering items based on the similarity between user ratings/actions',
            'Filtering recommendations based on user demographics only',
            'Filtering dataset outliers',
            'Sorting products alphabetically'
          ],
          ans: 0
        },
        {
          id: 'ml-6m-w13-h2',
          question: 'What is the "cold start" problem in recommendation systems?',
          type: 'mcq',
          options: [
            'Server crashes when restarting',
            'Difficulty recommending items to new users or recommending new items due to lack of historical data',
            'The training time is too long on cold servers',
            'Slow page load speed'
          ],
          ans: 1
        }
      ]
    }
  }
];

// ─── 3-MONTH CURRICULUM DATA ───
const proWeeks3Month = [
  {
    id: 1,
    week: 'Weeks 1-2',
    title: 'Python, NumPy & Pandas',
    points: 80,
    objectives: [
      'Python data structures and functions',
      'NumPy arrays and operations',
      'Pandas DataFrames for data analysis'
    ],
    content: `<h3>Python Data Science Stack</h3><p>Cover Python essentials, NumPy for numerical computing, and Pandas for data manipulation in 2 weeks with hands-on exercises.</p>`,
    resources: {
      websites: [
        { title: 'Kaggle Python Course (Free)', url: 'https://www.kaggle.com/learn/python' }
      ],
      videos: [
        { title: 'Python for Data Science — freeCodeCamp', url: 'https://www.youtube.com/embed/LHBE6Q9XlzI', dur: '12 hr' },
        { title: 'Pandas Crash Course — Corey Schafer', url: 'https://www.youtube.com/embed/ZyhVh-qRZPA', dur: '4 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-3m-w1-e1',
          question: 'Which Pandas method is used to show basic descriptive statistics of a DataFrame?',
          type: 'mcq',
          options: ['.head()', '.describe()', '.info()', '.shape'],
          ans: 1
        },
        {
          id: 'ml-3m-w1-e2',
          question: 'NumPy arrays are faster and more memory-efficient than native Python lists.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-3m-w1-m1',
          question: 'What does Pandas use to represent a single column of data?',
          type: 'mcq',
          options: ['Series', 'DataFrame', 'Index', 'Array'],
          ans: 0
        },
        {
          id: 'ml-3m-w1-m2',
          question: 'Which of the following are valid Pandas operations? (Select all that apply)',
          type: 'msq',
          options: ['df.dropna()', 'df.groupby()', 'df.merge()', 'df.add_css()'],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'ml-3m-w1-h1',
          question: 'Which Pandas function creates a pivot-table-like aggregation from categorical features?',
          type: 'mcq',
          options: ['pd.pivot_table()', 'df.groupby()', 'pd.crosstab()', 'df.stack()'],
          ans: 0
        },
        {
          id: 'ml-3m-w1-h2',
          question: 'How do you check for missing values in a Pandas DataFrame?',
          type: 'mcq',
          options: ['df.isnull().sum()', 'df.has_nans()', 'df.find_empty()', 'df.nans()'],
          ans: 0
        }
      ]
    }
  },
  {
    id: 2,
    week: 'Weeks 3-4',
    title: 'ML Fundamentals + Scikit-Learn',
    points: 80,
    objectives: [
      'Core ML concepts and workflow',
      'Classical ML algorithms',
      'Model evaluation and validation'
    ],
    content: `<h3>Classical Machine Learning</h3><p>Supervised and unsupervised learning, regression, classification, clustering — all with scikit-learn.</p>`,
    resources: {
      websites: [
        { title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org' },
        { title: 'Kaggle Intro to ML (Free Course)', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' }
      ],
      videos: [
        { title: 'ML with Python — freeCodeCamp', url: 'https://www.youtube.com/embed/7eh4d6sabA0', dur: '6 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-3m-w2-e1',
          question: 'Which Scikit-Learn function is used to split datasets into training and testing subsets?',
          type: 'mcq',
          options: ['train_split()', 'test_train_split()', 'train_test_split()', 'split_data()'],
          ans: 2
        },
        {
          id: 'ml-3m-w2-e2',
          question: 'K-Means clustering requires labeled training labels to function.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'ml-3m-w2-m1',
          question: 'Which metric is most appropriate for evaluating a regression model?',
          type: 'mcq',
          options: ['Accuracy', 'F1-score', 'Mean Absolute Error (MAE)', 'Precision'],
          ans: 2
        },
        {
          id: 'ml-3m-w2-m2',
          question: 'Which of the following are supervised classification algorithms? (Select all that apply)',
          type: 'msq',
          options: ['Logistic Regression', 'Support Vector Machines (SVM)', 'K-Means', 'Random Forest'],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'ml-3m-w2-h1',
          question: 'What is cross-validation and why is it used?',
          type: 'mcq',
          options: [
            'Splitting training data into folds to train/test the model multiple times, obtaining a robust performance estimate',
            'Validating database connections',
            'Cross-checking code formatting errors',
            'An encryption technique for model security'
          ],
          ans: 0
        },
        {
          id: 'ml-3m-w2-h2',
          question: 'What is hyperparameter tuning?',
          type: 'mcq',
          options: [
            'Updating model weights during training',
            'Searching for the best configuration parameters (e.g. learning rate, tree depth) before training begins',
            'Running predictions on the test set',
            'Cleaning dataset outliers'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 3,
    week: 'Weeks 5-7',
    title: 'Deep Learning with PyTorch',
    points: 90,
    objectives: [
      'Neural network fundamentals',
      'CNNs for images, RNNs for sequences',
      'Train and evaluate deep learning models'
    ],
    content: `<h3>Deep Learning Accelerated</h3><p>Cover neural networks, CNNs, and RNNs with PyTorch over 3 weeks with hands-on projects.</p>`,
    resources: {
      websites: [
        { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/' },
        { title: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai' }
      ],
      videos: [
        { title: 'PyTorch Full Course — freeCodeCamp', url: 'https://www.youtube.com/embed/c36lUUr864M', dur: '10 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-3m-w3-e1',
          question: 'Which PyTorch class do all custom neural network modules inherit from?',
          type: 'mcq',
          options: ['nn.Layer', 'nn.Model', 'nn.Module', 'nn.Network'],
          ans: 2
        },
        {
          id: 'ml-3m-w3-e2',
          question: 'ReLU activation outputs a value of 0 for any negative input.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-3m-w3-m1',
          question: 'In deep learning, what is a batch?',
          type: 'mcq',
          options: [
            'The total number of parameters in the model',
            'A subset of training samples processed in one forward/backward pass of the model',
            'A folder containing model configurations',
            'The learning rate schedule'
          ],
          ans: 1
        },
        {
          id: 'ml-3m-w3-m2',
          question: 'Which of the following layers are typically found in a CNN? (Select all that apply)',
          type: 'msq',
          options: ['Convolutional Layer', 'Max Pooling Layer', 'Recurrent Layer', 'Fully Connected (Linear) Layer'],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'ml-3m-w3-h1',
          question: 'What is the purpose of `optimizer.zero_grad()` in PyTorch training loops?',
          type: 'mcq',
          options: [
            'It resets parameter gradients to zero so that they do not accumulate across multiple training steps',
            'It resets model weights to random values',
            'It halts the optimization process',
            'It calculates the loss function values'
          ],
          ans: 0
        },
        {
          id: 'ml-3m-w3-h2',
          question: 'What is overfitting in deep learning and how can it be mitigated?',
          type: 'mcq',
          options: [
            'Model performs poorly on training data; mitigate by reducing model capacity',
            'Model memorizes training noise and fails to generalize; mitigate by using dropout, weight decay, or early stopping',
            'Model is too fast; mitigate by slowing down server CPUs',
            'Model is too simple; mitigate by removing layers'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 4,
    week: 'Weeks 8-9',
    title: 'NLP & Transformers Intro',
    points: 80,
    objectives: [
      'Text preprocessing and embeddings',
      'Fine-tune pretrained models with Hugging Face',
      'Build a text classification app'
    ],
    content: `<h3>Modern NLP</h3><p>Text processing, word embeddings, and fine-tuning BERT/DistilBERT with Hugging Face Transformers library.</p>`,
    resources: {
      websites: [
        { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course' }
      ],
      videos: [
        { title: 'Hugging Face Course — Official', url: 'https://www.youtube.com/embed/00GKzGyWFEs', dur: '2 hr' },
        { title: 'BERT Explained — CodeEmporium', url: 'https://www.youtube.com/embed/xI0HHN5XKDo', dur: '30 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-3m-w4-e1',
          question: 'What is fine-tuning a pretrained model?',
          type: 'mcq',
          options: ['Training a model from scratch', 'Adapting a pretrained model to a specific task by training it on specialized data', 'Removing hidden layers', 'Reducing the parameter precision'],
          ans: 1
        },
        {
          id: 'ml-3m-w4-e2',
          question: 'Hugging Face is a popular platform and library for working with pretrained transformer models.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-3m-w4-m1',
          question: 'Which architecture, introduced in 2017, forms the foundation of modern Large Language Models?',
          type: 'mcq',
          options: ['Convolutional Neural Network', 'Recurrent Neural Network', 'Transformer', 'Multi-Layer Perceptron'],
          ans: 2
        },
        {
          id: 'ml-3m-w4-m2',
          question: 'Which of the following are benefits of using pretrained models? (Select all that apply)',
          type: 'msq',
          options: [
            'Requires significantly less training data',
            'Saves massive amounts of computational time and cost',
            'Guarantees 100% accuracy on all tasks',
            'Leverages high-quality features learned from massive datasets'
          ],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'ml-3m-w4-h1',
          question: 'What is the self-attention mechanism in Transformers?',
          type: 'mcq',
          options: [
            'A mechanism allowing the model to focus on different parts of the input sequence when processing a word',
            'A form of regularization',
            'An activation function',
            'A training schedule'
          ],
          ans: 0
        },
        {
          id: 'ml-3m-w4-h2',
          question: 'What is tokenization in NLP?',
          type: 'mcq',
          options: [
            'Splitting a string of text into smaller units (tokens) such as words or subwords',
            'Encrypting text datasets',
            'Generating sentences',
            'Tagging parts of speech'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 5,
    week: 'Weeks 10-11',
    title: 'Model Deployment & MLOps Basics',
    points: 80,
    objectives: [
      'Deploy models with FastAPI',
      'Build Streamlit demos',
      'Track experiments with MLflow'
    ],
    content: `<h3>Ship Your Models</h3><p>Deploy trained models as APIs with FastAPI, build interactive demos with Streamlit, and track experiments with MLflow.</p>`,
    resources: {
      websites: [
        { title: 'FastAPI Docs', url: 'https://fastapi.tiangolo.com' }
      ],
      videos: [
        { title: 'FastAPI + ML Deployment — Krish Naik', url: 'https://www.youtube.com/embed/b5F667g1yCk', dur: '1 hr' },
        { title: 'Streamlit Course — freeCodeCamp', url: 'https://www.youtube.com/embed/JwSS70SZdyM', dur: '2 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-3m-w5-e1',
          question: 'Which tool runs FastAPI applications as an ASGI server?',
          type: 'mcq',
          options: ['Flask', 'Uvicorn', 'Django', 'Node.js'],
          ans: 1
        },
        {
          id: 'ml-3m-w5-e2',
          question: 'MLflow is used to log metrics, parameters, and artifacts during model training experiments.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-3m-w5-m1',
          question: 'What HTTP method is typically used to send features to an ML inference API endpoint and receive a prediction?',
          type: 'mcq',
          options: ['GET', 'POST', 'DELETE', 'PUT'],
          ans: 1
        },
        {
          id: 'ml-3m-w5-m2',
          question: 'Which of the following are advantages of FastAPI? (Select all that apply)',
          type: 'msq',
          options: ['Fast execution speed', 'Type-safety using Python type hints', 'Automatic interactive docs', 'Built-in database engine'],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'ml-3m-w5-h1',
          question: 'What is a container image in Docker?',
          type: 'mcq',
          options: [
            'A read-only template with instructions for creating a Docker container containing the code, runtime, system tools, and libraries',
            'A screenshot of the database',
            'A web design mockup',
            'A network protocol'
          ],
          ans: 0
        },
        {
          id: 'ml-3m-w5-h2',
          question: 'How do you load a saved scikit-learn model inside a FastAPI endpoint?',
          type: 'mcq',
          options: [
            'Using `joblib.load()` or `pickle.load()` on startup, and calling its `.predict()` method in the endpoint function',
            'Retraining the model on every HTTP request',
            'By importing the scikit-learn raw source code',
            'FastAPI models cannot load scikit-learn models'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 6,
    week: 'Week 12',
    title: 'Capstone Project & Portfolio',
    points: 80,
    objectives: [
      'Build an end-to-end ML project',
      'Deploy it publicly',
      'Document and present your work'
    ],
    content: `<h3>Portfolio Project</h3><p>Build a complete ML project: data collection, EDA, model training, evaluation, deployment, and documentation. This is what employers look for.</p>`,
    resources: {
      websites: [
        { title: 'Kaggle Datasets', url: 'https://www.kaggle.com/datasets' },
        { title: 'How to Build an ML Portfolio', url: 'https://towardsdatascience.com/how-to-build-an-amazing-machine-learning-portfolio-f27b71e7c8ba' }
      ],
      videos: [
        { title: 'ML Portfolio Guide — Ken Jee', url: 'https://www.youtube.com/embed/1aXk2RViq3c', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'ml-3m-w6-e1',
          question: 'What should every ML project README file contain?',
          type: 'mcq',
          options: [
            'Only code snippets',
            'Problem statement, dataset details, methodology, results, and deployment demo link',
            'Only model accuracy percentage',
            'Only the developer\'s name'
          ],
          ans: 1
        },
        {
          id: 'ml-3m-w6-e2',
          question: 'Deploying a project publicly (e.g. on Streamlit Community Cloud or Hugging Face Spaces) is highly recommended for portfolios.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'ml-3m-w6-m1',
          question: 'What is Exploratory Data Analysis (EDA) and why is it important in capstone projects?',
          type: 'mcq',
          options: [
            'Running predictions on the test set',
            'Analyzing and visualizing datasets to summarize their main characteristics and guide model building',
            'Writing API endpoints',
            'Deploying containers'
          ],
          ans: 1
        },
        {
          id: 'ml-3m-w6-m2',
          question: 'Which of the following are excellent ways to share your portfolio projects? (Select all that apply)',
          type: 'msq',
          options: [
            'GitHub repository with clear documentation',
            'A blog post explaining the technical journey and findings',
            'An interactive deployed web application',
            'Leaving the code on your local computer'
          ],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'ml-3m-w6-h1',
          question: 'What is the "data leakage" problem in ML projects?',
          type: 'mcq',
          options: [
            'Target labels leaking to hackers',
            'Information from outside the training dataset (e.g. test set statistics) is used to create or tune the model, leading to overly optimistic test performance',
            'Database records being deleted',
            'Slow queries'
          ],
          ans: 1
        },
        {
          id: 'ml-3m-w6-h2',
          question: 'When deploying a capstone ML model, how can you ensure it doesn\'t crash under high memory load?',
          type: 'mcq',
          options: [
            'By optimizing model parameters (e.g. using quantized models, smaller datatypes, or clearing GPU cache)',
            'By increasing the learning rate',
            'By using more complex models',
            'By disabling logging'
          ],
          ans: 0
        }
      ]
    }
  }
];

const getMLRoadmap = (duration = '6 months') => {
  const aimlRoadmap = {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    description: 'Master the entire ML pipeline from data to production.',
    difficulty: 'Intermediate',
    icon: '🤖',
    color: '#8B5CF6',
    domain: 'Artificial Intelligence',
    category: 'Technical',
    enrolled: 1240,
    targetUsers: ['Global BK', 'Campus'],
    durations: {
       '6 months': { label: '6 Months (Intensive)', tagline: 'Comprehensive — covers everything including specialization', weeks: 16, totalPoints: 1200, sections: proWeeks6Month },
       '3 months': { label: '3 Months (Fast-Track)', tagline: 'Accelerated — essentials to job-ready fast', weeks: 12, totalPoints: 1200, sections: proWeeks3Month },
       '6months': { label: '6 Months (Professional)', tagline: 'Comprehensive curriculum', weeks: 16, totalPoints: 1200, sections: proWeeks6Month },
       '3months': { label: '3 Months (Professional)', tagline: 'Accelerated curriculum', weeks: 12, totalPoints: 1200, sections: proWeeks3Month }
    }
  };

  return aimlRoadmap;
};

export default getMLRoadmap;
