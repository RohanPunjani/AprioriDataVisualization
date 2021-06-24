# AprioriDataVisualization

It is a Data Mining Project in order to handle data and present it on a webpage.

The UI design is still in progress, here's a sneak peek of the frontend part

![apriori](https://user-images.githubusercontent.com/48467821/123241342-ad58ed00-d4fe-11eb-89af-f6ee64b17f83.png)



# Association Rules

Association Rules has 3 important rules:

- Support: This measure defines the likeliness of occurrence of consequent on the cart given that the cart already has the antecedents.
- Cofidence: This measure gives an idea of how frequent an itemset is in all the transactions
- Lift: Lift controls for the support (frequency) of consequent while calculating the conditional probability of occurrence of {Y} given {X}.

There is another rule known as conviction: 
- Conviction: It compares the probability that {X} appears without {Y} if they were dependent with the actual frequency of the appearance of {X} without {Y}.

## Aim

My Aim was to give user all these details when a product is selected, so I made something like this:

![image](https://user-images.githubusercontent.com/48467821/123241408-c3ff4400-d4fe-11eb-9946-c441c63887d1.png)


All the data that you are seeing in this image actually comes from the algorithm that we have ran on the backend <code>app.py</code> file

# How to run

1. Clone the repo
2. Go to the repo directory
3. Run backend:
    1. Open Terminal
    2. Type cmd: `python app.py`
    3. If it gives errors like `module not found`, install the module using <code>pip install `module`</code>. Replace `module` with the error module.
4. Run Frontend:
    1. Create new terminal
    2. Go to client folder
    3. Type cmd: `npm install`
    4. Type cmd: `npm start`
5. Enjoy

If you like this repo, check out my profile at [github.com/RohanPunjani](https://github.com/RohanPunjani). 

Thank You for making it this far XD
