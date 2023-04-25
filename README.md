# Team 6 Sense 8-Ball Documentation
## Directions: 
  - Step 1: Input question that you want to ask the 8-ball.
  - Step 2: Hover your mouse over the 8-ball picture 
  - Step 3: Click on it to return your fortune. 

## Features: 
### Input
- A text box to input your questions
### Fortune
- Returns a randomized fortune after the you ask a question.
### Clear Button 
- A clear button that clears the previous questions
### Response Record
 - A table storing previous questions and corresponding fortune.
 - Once the site is closed and open it back up the 8-Ball still contains the previous questions and corresponding fortunes.
### Animation
- The 8-ball shakes and cycles through the responses after the us
- If you forget or don't put in a question, the 8-ball picture will shake slightly. 
- The 8-ball picture has sound effects when you click on it and also after you get your fortune. 
- If you click on the 8-ball picture without inputting your questions, then it returns "Please enter your question".  
## Implementation:
- We used ChatGPT to generate the code HTML, JavaScript and CSS to create the 8-Ball site. 
- For one of features which is the feature that stores the responses, in HTML we created a table to contain the responses and in JavaScript we have a function called **writeToLocaStorage** that takes in the question and response and push to the history object which is saved to a JavaScript object called localStorage that stores previous questions and fortune. It is useful because once the browser is closed the data doesn't get deleted. When you open up the 8-Ball site, the previous questions and corresponding fortune are still available. 
- For the animation feature which has the 8-ball shakes and output sound effects we have a function **shakeBall** that enables the 8-Ball to shake depending on what the user inputs. Therefore, it shakes lightly if there isn't a question. Furthermore, in order to output the sound effects feature we use a method called **addEventListener** which is triggered when the user clicks on the 8-ball image. 


