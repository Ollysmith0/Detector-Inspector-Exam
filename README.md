# Detector-Inspector-Exam
- This Challenge is quite new to me.
- I have spent almost a day for researching to complete this task.

# This project is divided into 2 parts:
1. client - using React
2. server - using Node - Express

# How to use
1. Clone this repository
2. npm install - both on client and server to get all necessary dependencies.
3. npm start - both on client and server

# Instruction
- This application is received your URL as an input and the output is the image of graph base on the table in your URL (website)
1. Run the app
2. Input valid URL
3. Submit to see the preview graph base on the table in your URL (website)
4. Save as an image to your computer

# Application flow
1. Client using React will received an URL and send to server.
2. Server analyze the url and send html document (string) to client.
3. Client get the html document and render.
4. Client get all the tables inside the document.
5. Client using chart JS(graph helper library) to display an graph.
6. Client using file-saver (To save graph as an image) to your computer.

# Improvement
- To be honest, this is the first time I'm doing this challenge, 
- at first it's really confused me to consider which side (client or server) to output an image,
- how to scan for a table... And finally I have completed it, I fell so excited. And somehow, there should be
- some point that need to be improve. I'll list it here if I got more time:
1. Application flow (if you don't keep follow the instruction above, the application might suddenly crashed)
2. Styling (Making UI more friendly)
3. Unit Test

# Thanks for reading, this might take about 5 minutes but making the application more easy to use.
