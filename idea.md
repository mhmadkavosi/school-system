* Quiz : 
    * Add Quiz system
    * Question
    * Answer
    * User can answer
    * Teacher can create
    * Time exam
    * Quiz history
    * Quiz have time for take quiz
* Scholl System : 
    * Teacher can create quiz
    * Student can  question
    * Make class
    * student can have just one class
    * classes have time 
    * book for classes
    * grade for classes
    * teachers can have more than one class
    * book is for all students
    * when student is B1 can not go B2 (grade)
* Teacher :
    * Can have class
    * Can add student into class
    * Can add quiz
    * info about teachers
    * page for all classes
* Student : 
    * Can go to one class
    * Can do quiz
    * info about students
    * info of class
* Other stuff: 
    * working with jwt or outh for login
    * image uploder for teacher and student avatar
    * email sender
    * sms sender
    * two factor authentication
    * student and teacher can chat (NOT IMPORTANT YET!!!!)
    * use redis for authenticated user with phone number
    * make a soulition for quiz like have excel sheet example and starter file for make question and asnwers in excel and uploaded in website
    * take care of securty

How to work : 
make a refrence for user and teacher in quizModel
we check user type with JWT
check user class JWT (user is authorize for this exam)
check user quiz JWT (user is authorize for this class and exam)