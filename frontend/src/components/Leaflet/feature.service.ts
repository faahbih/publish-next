import biomesLabels from 'assets/biomes-forest-code-labels.json';
import biomes from 'assets/biomes-forest-code.json';
import brazilLabels from 'assets/brazil-forest-code-labels.json';
import brazil from 'assets/brazil-forest-code.json';
import { View } from 'containers/Types';

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
        visible: true,
        data: biomes as GeoJSON.GeoJsonObject,
      });
    });
  }

  public getBiomesLabels(): Promise<View> {
    return new Promise((resolve: any) => {
      resolve({
        name: 'Biomes Labels',
        visible: false,
        data: biomesLabels as GeoJSON.GeoJsonObject,
      });
    });
  }

  public getBrazil(): Promise<View> {
    return new Promise((resolve: any) => {
      resolve({
        name: 'Brazil',
        visible: false,
        data: brazil as GeoJSON.GeoJsonObject,
      });
    });
  }

  public getBrazilLabels(): Promise<View> {
    return new Promise((resolve: any) => {
      resolve({
        name: 'Brazil Labels',
        visible: false,
        data: brazilLabels as GeoJSON.GeoJsonObject,
      });
    });
  }
}
