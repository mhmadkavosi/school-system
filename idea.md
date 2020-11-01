* Quiz : 
    * Question
    * Answer
    * User can answer
    * Teacher can create
    * Time exam
* Teacher :
    * Can have class
    * Can add student into class
    * Can add quiz
* Student : 
    * Can go to one class
    * Can do quiz

How to work : 
make a refrence for user and teacher in quizModel
we check user type with JWT
check user class JWT (user is authorize for this exam)
check user quiz JWT (user is authorize for this class and exam)