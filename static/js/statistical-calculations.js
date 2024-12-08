class StatisticalCalculations {
    static calculateMovingAverage(data, window) {
        const result = [];
        for (let i = 0; i < data.length - window + 1; i++) {
            const windowSlice = data.slice(i, i + window);
            const average = windowSlice.reduce((a, b) => a + b) / window;
            result.push(average);
        }
        return result;
    }

    static calculateStandardDeviation(values) {
        const mean = values.reduce((a, b) => a + b) / values.length;
        const squareDiffs = values.map(value => Math.pow(value - mean, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / values.length;
        return Math.sqrt(avgSquareDiff);
    }

    static calculateRegressionLine(xValues, yValues) {
        const n = xValues.length;
        const sumX = xValues.reduce((a, b) => a + b);
        const sumY = yValues.reduce((a, b) => a + b);
        const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
        const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return { slope, intercept };
    }

    static calculateConfidenceInterval(values, confidence = 0.95) {
        const n = values.length;
        const mean = values.reduce((a, b) => a + b) / n;
        const stdDev = this.calculateStandardDeviation(values);
        const criticalValue = 1.96; // 95% confidence interval

        const marginOfError = criticalValue * (stdDev / Math.sqrt(n));
        return {
            lower: mean - marginOfError,
            upper: mean + marginOfError
        };
    }
}
