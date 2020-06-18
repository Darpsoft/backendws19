function getFecha(e?: Date): string{
    const d = e ? e : new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1)  + '-' + d.getDate();
}
function sumarDia(f: Date, d: number): Date {
    f.setDate(f.getDate() + d);
    return f;
}
function restarDia(f: Date, d: number): Date{
    f.setDate(f.getDate() - d);
    return f;
}


export {
    getFecha,
    sumarDia,
    restarDia
}