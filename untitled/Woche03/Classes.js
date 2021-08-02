class person{
    constructor(lastname, firstname, age){
        this._lastname = lastname;
        this._firstname = firstname;
        this._age = age;
    }

    set personAge(newAge){
        return this._age;
    }

    greet(){
        alert(this._lastname + " , " + this._firstname + " " + this._lastname + " mein Name - " + this._age + " Jahre");
    }
}

class Student extends person{
    constructor(firstname, lastname, age, matnr) {
        super(firstname, lastname, age);
        this._matnr = matnr;
    }

    ident(){
        alert("Meine Matrikelnummer: " + this._matnr);
    }
}

var myStudent = new Student("Paul", "Maier", 25, 332412);
myStudent.greet();
myStudent.ident();