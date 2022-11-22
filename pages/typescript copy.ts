// Typescript
// Type 검사 및 컴파일 시 오류 검사
// 타입스크립트는 자바스크립트에 타입을 부여한 언어입니다.
// 브라우저에서 실행하려면 파일을 한번 변환 해줘야 한다. 컴파일 (compfile) 필요.

// 배열 array
let arr:string[] = ['a', 'b', 'c'];

let list:number[] = [1,2,3]; // 혹은 
// list라는 변수 타입은 number 배열이다
let listAll:Array<number> = [1,2,3];  
// Array<number>: 리스트는 숫자의 배열이다

// 함수 function :void 반환값이 없는 경우 
const getNumber = (i:number):void => {
    console.log(i);
}
// const 변수이름 = (변수:변수종류):함수의 타입 => {}

// 객체 object
let point:{x:number; y:number; } = {
    x:20,
    y:10
}

// 클래스 class
class Music{}
let music:Music = new Music();
//Music 클래스에다가 새로운 연산자를 붙이면 새로운 객체 타입을 만들수있다.

let isDone:boolean = false;
let u:undefined = undefined; //뜻: 이 변수들이 할당할 수 있는 값이 없습니다!
let n:null =null; //뜻: 이 변수들이 할당할 수 있는 값이 없습니다!

//  let 변수:{객체: 1의 타입; 객체: 2y의 타입; ...등등} = {}

// :string문자열, :number 숫자, :boolean true와 false 값, :null,
// :undefined 초기화되지 않은 변수의 기본값, :symbil 고유한 상수 값

//Any 잘 알지 못하는 타입, 이 경우 타입 검사를 하지 않는다. 하지만 이 타입을 사용하지 않는것을 추천한다.
let something:any = "hello";
something=23;
something=true;

let arrA:any[] = ["hello",23,true];

//Union
let code:(string|number); //code라는 변수에는 숫자도 들어갈수 있고, 문자도 들어갈수있다. :let code:string|number; 이렇게 써도 됨
code=123;
code="abc";
//code=false; 이럴경우 string 혹은 number 가 아니기 때문에 오류가 뜬다.

//Tuple 요소의 타입과 개수가 고정된 배열을 표현
let x:[string, number];
x=["hello", 10];
//x=[10, "hello"]; 순서가 달라서 오류로 뜨게 된다.
var user:[number, string, boolean, number, string];
user=[1, "hello", true, 20, "bye"];

var employee:[number,string][];
employee=[[1,"kim"],[2,"lee"],[3,"park"]];

//Enum  enumerated type(열거형) 값들의 집합
enum PrintMedia { Newspaper, Newsletter, Magazine, Book}
let mediaType:PrintMedia = PrintMedia.Book 
//length 개념으로 카운트 되기 때문에 PrintMedia.Book = 3 , 속성 종류는 number 가 된다. let mediaType:PrintMedia대신 let mediaType:number도 가능은 하긴함 

let mediaName:string = PrintMedia[0];//Newspaper

enum PrintMedia2 { Newspaper=1, Newsletter=50, Magazine=55, Book}
let mediaType2:number = PrintMedia2.Book; //이럴경우 바로 직전에 있는 수에 +1 이 된다(length가 1늘었기 떄문에) = 56
let mediaName2:string = PrintMedia2[56]; //Book

enum LanguageCode {
    korean ='ko',
    english = 'en',
    japanese = 'ja',
    chinese = 'zh',
    spanish = 'es',

}
const langcode:LanguageCode = LanguageCode.english; //en

//void void 유형은 함수가 return 하지 않는다. 값으로 undefind 이나 null 값을 가질 수 있다.
function sayHi():void{
    console.log('Hi!');
}

let speech:void = sayHi();
console.log(speech); //undefind값이 나온다

//Never 절대 발생하지 않을 값 
//ex) let nothing:never = null;  어떠한 값이 나오면 안되기 때문에 에러가 뜬다.

const rate:number = 5; //개발자가 타입을 지정
//const rate = 5; //타입스크립트가 알아서 타입을 추론하게 된다. (비추)

//타입을 추론하지 못하게 하는 경우
//1.any 타입을 리턴하는 경우. 리턴타입이 일정하지 않으면 타입스크립트는 any타입을 리턴한다고 추론한다.
const json='{"x":4, "y":7}'
const coordinates = JSON.parse(json);
//2.변수 선언을 먼저하고 나중에 초기화하는 경우 타입을 추론을 못한다.
let greeting;
greeting='hello';
//3.변수에 대입될 값이 일정치 못하는 경우. 여러값이 저장되어야 할때에는 |로 여러타입을 지정해준다.
let num: boolean | number = false;

//type assertion 타입 표명  오류 
// var foo = {};
// foo.bar = 123; // 이렇게 하면 에러가 뜸
// foo.bas = 'hello'; 이렇게 하면 에러가 뜸


//type assertion 타입 표명 오류 보안 방법
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
var foo = {} as {bar: number; bas: string;};//위의 내용을 이렇게도 쓸수있다.
foo.bar = 123;
foo.bas = 'hello';
