// height in cm, weight in kg
const calculateBmi = (heightCm, weightKg) => {
    if (!heightCm || !weightKg) return undefined;
    const heightM = heightCm / 100;
    return +(weightKg / (heightM * heightM)).toFixed(1);
}

module.exports = calculateBmi;
