import { months } from "@/constants/months";

function monthToNumber(mes: string): number {
    return months.indexOf(mes);
}

export function orderPeriods(a: string, b: string): number {
    const partA = a.split('/');
    const partB = b.split('/');
    
    const yearA = parseInt(partA[1]);
    const yearB = parseInt(partB[1]);
    
    if (yearA !== yearB) {
        return yearA - yearB;
    } else {
        const monthA = partA[0];
        const monthB = partB[0];
        const numberMonthA = monthToNumber(monthA);
        const numberMonthB = monthToNumber(monthB);
        
        return numberMonthA - numberMonthB;
    }
}
