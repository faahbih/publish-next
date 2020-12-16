import biomesLabels from 'assets/biomes-forest-code-labels.json';
import biomes from 'assets/biomes-forest-code.json';
import brazilLabels from 'assets/brazil-forest-code-labels.json';
import brazil from 'assets/brazil-forest-code.json';
import { View, ViewType } from 'containers/Types';

const scenarios: any = {
  FC: `
  Attempt to capture the future impacts of all key provisions of a
  rigorously enforced Brazil's Forest Code
  `,
  NoFC: `Allow both legal and illegal deforestation at all times, which is
  driven by the demand for agricultural commodities, and does not include
  any policy restrictions`,
};

const attributes: any = {
  Soybean: 'Lorem',
  Cropland: `Planted areas with the following crops:
  barley, dry beans, cassava, corn, cotton, groundnut, palm oil, potato,
  rice, sorghum, soybeans, sugarcane, sweet potato, wheat`,
  Grassland: 'Pasture areas used for livestock ranching',
  'Native Vegetation': 'Native vegetation including rainforest and savannas',
};

export class FeatureService {
  private static instance: FeatureService;

  private constructor() {}

  public static getInstance(): FeatureService {
    if (!FeatureService.instance) {
      FeatureService.instance = new FeatureService();
    }

    return FeatureService.instance;
  }

  public getBiomes(): Promise<View> {
    return new Promise((resolve: any) => {
      resolve({
        name: 'Biomes',
        type: ViewType.BORDER,
        description: 'Lorem',
        visible: true,
        data: biomes as GeoJSON.GeoJsonObject,
      });
    });
  }

  public getBiomesLabels(): Promise<View[]> {
    return new Promise((resolve: any) => {
      let firstVisible = true;
      const views = Object.keys(attributes).map((attribute) => {
        const isViewVisible = firstVisible;
        firstVisible = false;
        return {
          name: attribute,
          type: ViewType.ATTRIBUTE,
          description: attributes[attribute],
          visible: isViewVisible,
          data: biomesLabels as GeoJSON.GeoJsonObject,
        };
      });

      resolve(views);
    });
  }

  public getBrazil(): Promise<View> {
    return new Promise((resolve: any) => {
      resolve({
        name: 'Brazil',
        type: ViewType.BORDER,
        description: 'Lorem',
        visible: false,
        data: brazil as GeoJSON.GeoJsonObject,
      });
    });
  }

  public getBrazilLabels(): Promise<View[]> {
    return new Promise((resolve: any) => {
      let firstVisible = true;
      const views = Object.keys(attributes).map((attribute) => {
        const isViewVisible = firstVisible;
        firstVisible = false;
        return {
          name: attribute,
          type: ViewType.ATTRIBUTE,
          description: attributes[attribute],
          visible: isViewVisible,
          data: brazilLabels as GeoJSON.GeoJsonObject,
        };
      });

      resolve(views);
    });
  }

  public getScenarios(): Promise<View[]> {
    return new Promise((resolve: any) => {
      let firstVisible = true;
      const views = Object.keys(scenarios).map((scenario) => {
        const isViewVisible = firstVisible;
        firstVisible = false;
        return {
          name: scenario,
          type: ViewType.SCENARIO,
          description: scenarios[scenario],
          visible: isViewVisible,
        };
      });

      resolve(views);
    });
  }
}
