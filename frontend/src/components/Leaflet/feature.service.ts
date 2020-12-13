import rawData from 'assets/biomes-forest-code.json';

export class FeatureService {
  private static instance: FeatureService;

  private constructor() {}

  public static getInstance(): FeatureService {
    if (!FeatureService.instance) {
      FeatureService.instance = new FeatureService();
    }

    return FeatureService.instance;
  }

  public getBiomes(): Promise<GeoJSON.GeoJsonObject> {
    return new Promise((resolve: any) => {
      resolve(rawData as GeoJSON.GeoJsonObject);
    });
  }
}
