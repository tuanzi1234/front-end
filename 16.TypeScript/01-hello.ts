//输出hello world
console.log('hello world');

//定义函数的参数、返回值类型
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(1, 2));
//箭头函数
const add2 = (a: number, b: number) => a + b;
console.log(add2(1, 2));

//可选参数
function add3(a: number, b?: number) {
    console.log(a, b);
}
add3(1);

//接口
interface Person {
    name: string
    age: number

    sayHi(): void
}
let obj: Person =
    {
        name: 'Tom',
        age: 18,
        sayHi() {
            console.log('hello world');
        }
    };
console.log(obj);
obj.sayHi();

//typeof
let p = { x: 0, y: 0 };
function printCord(point: typeof p) {
    console.log(`当前坐标为：${point.x},${point.y}`);
}
printCord({ x: 100, y: 100 }); // OK

//继承
class Person2 {
    move() {
        console.log('move');
    }
}
class Student extends Person2 {
    study() {
        console.log('study');
    }
}
const s = new Student();
s.move();
s.study();

interface print1 { x: number; y: number;}
interface print2 { x: number; y: number; z: number;}
type F1 = (a: print1) => void;
type F2 = (a: print2) => void;
let f1: F1;
let f2: F2;
f2 = f1;

type PersonObj = { name: string; age: number };
type Person1 = { [Key in keyof PersonObj]: PersonObj[Key] };