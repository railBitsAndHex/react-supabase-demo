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

export {validation1, validation2, validation3}