type Nnumber = number | null
type Nstring = string | null
type ValueOf<T> = T[keyof T]
type ValueOfPick<T, P extends keyof T> = ValueOf<T, P>