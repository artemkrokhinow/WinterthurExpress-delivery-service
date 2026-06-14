export type DeliverySpeed = 'standard' | 'express' | 'sameday';

export interface PackageDetails {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface CalculationState {
  addressFrom: string;
  addressTo: string;
  package: PackageDetails;
  speed: DeliverySpeed;
  options: {
    insurance: boolean;
    fragile: boolean;
  };
}

export function calculatePrice(state: CalculationState): number {
  let price = 15;

  if (state.package.weight > 1) {
    price += (state.package.weight - 1) * 2;
  }

  const volumeWeight = (state.package.length * state.package.width * state.package.height) / 5000;
  if (volumeWeight > state.package.weight) {
    price += (volumeWeight - state.package.weight) * 2;
  }

  if (state.speed === 'express') {
    price += 20;
  } else if (state.speed === 'sameday') {
    price += 40;
  }

  if (state.options.fragile) {
    price += 10;
  }

  if (state.options.insurance) {
    price += price * 0.05;
  }

  return Math.round(price * 100) / 100;
}
