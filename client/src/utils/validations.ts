const validation1 = (args1: string): boolean => {
    switch(args1){
        case "":
            return false
        case null:
            return false;
        case undefined:
            return false;
        default:
            return true;
    }
}
const validation2 = (args1: string, args2: string): boolean => {
    return validation1(args1) && validation1(args2);
}
const validation3 = (args1: string, args2: string, args3: string) => {
    return validation2(args1, args2) && validation1(args3);
}

const validationLen1 = (args1: string, lenVal: number) => {
    return args1.length >= lenVal;
}
const validationLen2 = (args1: string, args2: string, lenVal1: number, lenVal2: number) => {
    return validationLen1(args1, lenVal1) && validationLen1(args2, lenVal2);
}

export {validation1, validation2, validation3, validationLen1, validationLen2}