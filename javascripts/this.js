// We've been using 'var self = this' a lot.
// Why do we use it? What problem does it solve?
// This... erm, article? Will explain some of the mysteries of 'this',
// why we learned 'var self = this', and even delve into a
// better approach to handle the problem: .bind(), which you've
// probably heard PJ talk about. He likes to talk about it.

// This example will use students and student groups.
// Object instances and calling of functions are already made
// at the bottom of the page. You will be instructed on when to uncomment them
// while reading the article.
// Keep a browser open, test each method out as it is introduced, and see what
// happens in the console.

// UNCOMMENT LINE 162 AND LOAD THE INDEX

var Student = function(name, age){
  // When we call 'new Student', we enter the context of the instance
  // of Student we are creating. If we console.logged 'this', it will
  // show us the student, along with any of its properties.
  console.log("'this' when creating a new Student but before adding properties: ", this);
  // Hence why we can assign properties to it using 'this.something':
  this.name = name;
  this.age = age;

  // By using this.something, we are telling javascript to modify
  // the current context. In this case, we are telling it to modify the
  // student by giving it the properties 'name' and 'age' with the values
  // given in the parameters.
  console.log("'this' when creating a new student and after adding properties: ", this)
}

// Lets create the StudentGroup:

// UNCOMMENT LINE 163 AND LOAD THE INDEX

var StudentGroup = function(title){
  this.title = title;
  this.students = [];
  console.log("'this' when creating a new StudentGroup: ", this);
}

// Now let's give this student group a function to add Students.

// UNCOMMENT LINE 172 AND LOAD THE INDEX

StudentGroup.prototype.addStudent = function(student){
  // This function will be called from an instance of a StudentGroup.
  // So when it is called it will have the same context as that StudentGroup,
  // meaning that 'this' will refer to the StudentGroup that called the function.
  this.students.push(student)
  console.log("'this' when calling addStudent: ", this);
}

// Let's also give student groups the ability to introduce each of
// their student:

// UNCOMMENT LINE 174 AND LOAD INDEX

StudentGroup.prototype.introduceStudents = function(){
  // Now we are in the context of whichever StudentGroup instance
  // had its introduceStudents method called.
  console.log("'this' when calling introduceStudents: ", this);
  // For this function, we want to console log a message introducing
  // each of the group's students, their age, and the title of the student group.
  // Let's iterate over the students and make that happen.
  this.students.forEach(function(student){
    // Uh-oh, we entered a new function! Did that affect the context
    // assigned to 'this'? 
    console.log("'this' while inside the function introducing an individual student: ", this);
    // Oh no! Student Group is gone from 'this'! What will happen to our message now?
    // Can we still use this.title to get the student group title?
    console.log("Meet " + student.name + ", a " + student.age + " year old member of " + this.title);
    // Looks like we can't. this.title returns undefined (just like my name when I pop a
    // student from the queue! (facepalm))
    console.log('this.title: ', this.title);
    // We can fix this! But I'm depressed about introduceStudents now.
    // It leaves a bad taste in my mouth. I want to move on to a new function.
    // A function without a history of breaking code or breaking my heart.
  })
}

// COMMENT OUT LINE 174
// UNCOMMENT LINE 175 AND LOAD INDEX

StudentGroup.prototype.checkHomework = function(){
  // We called a function of student group again, so 'this'
  // once more refers to that student group.
  console.log("'this' when calling checkHomework: ", this);
  // In this function, we will iterate over the students again, checking if
  // they completed their homework. But this time we won't have broken code...
  var self = this;
  // There's our old buddy. But what is it doing?
  // Since the value of 'this' changes automatically, we're creating a new variable,
  // one that will not change (unless we tell it to). By setting it equal to
  // 'this', we're giving it the value of the current 'this', which will
  // stick with it as we go into deeper functions.
  // Note: 'self' is not special; we can use any word
  // instead of it. In fact, to demonstrate that, let's use another word too.
  // We will use 'flamethrower', courtesy of the random word generator
  // at wordgenerator.net.
  var flamethrower = this;
  self.students.forEach(function(student){
    // What is 'this' now?
    console.log("'this' while inside the function to grade an individual student: ", this);
    // It went back to Window, just like before. But since we have 'self' ready...
    console.log("'self' while inside the function to grade an individual student: ", self);
    // And and we also have 'flamethrower' ready...
    console.log("'flamethrower' while inside the function to grade an individual student: ", flamethrower);
    // Voila! We entered another function, but we found a way to maintain access
    // to our student group. So let's use that:
    if (["Chris Lee", "Ben", "Mason", "Joel"].indexOf(student.name) == -1){
      console.log(student.name + " of " + self.title + " did the javascript homework and learned a lot. Go " + student.name + "! Now do it again but in ruby.");
    } else {
      // Some people just have questionable priorities...
      console.log(student.name + " of " + flamethrower.title + " did not complete the homework because he was watching the World Cup instead of coding. :/");
    }
    // So this works. But is it the best method? As mentioned earlier,
    // no, it is not. There's a better method. Let's write a new function
    // to demonstrate it.
  })
}

// COMMENT OUT LINE 175
// UNCOMMENT LINE 176 AND LOAD INDEX

StudentGroup.prototype.endOfWDI = function(){
  // 'this' is now the student group again.
  console.log("'this' when calling endOfWDI: ", this);
  // We won't be using 'var self = this' this time...
  this.students.forEach(function(student){
    console.log(this.title + " is proud of " + student.name + " for finishing WDI, and is more than happy to finally be rid of her/him.")
    // J/K, you'll all be missed.
  }.bind(this))
  // Woah! What's that hanging off the end of that function?
  // That's .bind(). See how it's added on after the closing } of
  // the function inside forEach?
  // Since it's outside the function, what's the value of 'this' when 
  // it is used? (hint: look at the output of line 129).
  // Using .bind() tells that function that it should execute in a context
  // other than it's default context. The value we pass to it (whatever is inside
  // the parenthesis of the .bind()) is the context to apply to it. So when we pass 'this'
  // into .bind(), we're telling the function 'use the current context instead of your regular context'.

  // We don't always have to use the current context, either.

  // UNCOMMENT LINE 164
  // REPLACE 'this' WITH 'string' IN LINE 134.

  // What changed? What changes if you put 'lambda' there instead of 'string'?
  // Who's title is being used in each case?
  // What's happening is that we're explicitly telling the function what it's
  // 'this' value is. When we put in 'string', we're telling the function 'you are in
  // the context of the string StudentGroup'. When putting in 'lambda', we're telling
  // it that it is now the lambda StudentGroup. When putting in 'this', we're telling
  // it that it is now whatever the current 'this' is. And all without the
  // 'var self = this' hack. Nifty trick, right?
}


$(function(){
  // window.yaniv = new Student("Yaniv", 26);
  // window.lambda = new StudentGroup("Lambda");
  // window.string = new StudentGroup("String")

  // What's that window doing before the variable? It's the same as
  // defining a variable without using 'var'.
  // So "window.boo = 'boo'" is the same as just saying "boo = 'boo'".
  // It's good practice to put window when introducing global variables
  // so that people reading your code know it was intentionally
  // made global and that you did not just forget to use 'var'.

  // lambda.addStudent(yaniv);
  // lambda.introduceStudents();
  // lambda.checkHomework();
  // lambda.endOfWDI();

  
  // Let's try it all with other students, too
  // Disclaimer: I'm only doing this to trigger the else in the
  // checkHomework function. It won't introduce anything new.

  // potentialStudents = ["Chris Lee", "Ben", "Mason", "Joel"]
  // window.newStudent = new Student(potentialStudents[Math.floor(Math.random() * potentialStudents.length)], 95)
  // string.addStudent(newStudent);

  // string.introduceStudents();
  // string.checkHomework();
  // string.endOfWDI();


})

// Fun Facts:
// When in the default context (not in any function), the value of 'this' is the browser window.
// So saying 'this.boo = "boo"' is the same as saying 'window.boo = "boo"'.
// (and so it's also the same as 'boo = "boo"')

// We will set window.boo to equal "boo" and compare it with the other options
// which we won't define by hand.

// Uncomment lines 204 through 208 and check out the results.

// window.boo = "boo"

// console.log("window.boo == boo is:", window.boo == boo);
// console.log("window.boo == this.boo is:", window.boo == this.boo);
// console.log("boo == this.boo is:", boo == this.boo);
