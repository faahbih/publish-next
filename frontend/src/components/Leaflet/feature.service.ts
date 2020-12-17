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

const borders: any = {
  Biomes: 'Lorem',
  Brazil: 'Lorem',
};

const backgrounds: any = {
  DS: 'Downscaling (1x1Km at Equator)',
  CR: 'ColRow (50x50km at Equator)',
  LU: 'Large Unit (200x200Km at Equator)',
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

  public getAttriburesBiomes(): Promise<View[]> {
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

  public getAttributesBrazil(): Promise<View[]> {
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

  public getBorders(): Promise<View[]> {
    return new Promise((resolve: any) => {
      const views = [
        {
          name: 'None',
          type: ViewType.BORDER,
          description: 'No data',
          visible: true,
        },
        {
          name: 'Biomes',
          type: ViewType.BORDER,
          description: borders['Biomes'],
          visible: false,
          data: biomes as GeoJSON.GeoJsonObject,
        },
        {
          name: 'Brazil',
          type: ViewType.BORDER,
          description: borders['Brazil'],
          visible: false,
          data: brazil as GeoJSON.GeoJsonObject,
        },
      ];

      resolve(views);
    });
  }

  public getBackgrounds(): Promise<View[]> {
    return new Promise((resolve: any) => {
      const views = Object.keys(backgrounds).map((background) => {
        return {
          name: background,
          type: ViewType.BACKGROUND,
          description: backgrounds[background],
          visible: false,
          url: `${process.env.PUBLIC_URL}/wms/${background}/{z}/{x}/{y}.png`,
        };
      });

      const none: any = {
        name: 'None',
        type: ViewType.BACKGROUND,
        description: 'No data',
        visible: true,
      };

      views.unshift(none);
      resolve(views);
    });
  }
}
