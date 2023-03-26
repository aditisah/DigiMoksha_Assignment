export class Report {
  public state: string;
  public district: string;
  public subDistrict: string;
  public block: string;
  public PFO: string;
  public shareHolders: string;
  public womenFarmerPercentage: string;

  constructor(
    state: string,
    district: string,
    subDistrict: string,
    block: string,
    PFO: string,
    shareHolders: string,
    womenFarmerPercentage: string
  ) {
    this.state = state;
    this.district = district;
    this.subDistrict = subDistrict;
    this.block = block;
    this.PFO = PFO;
    this.shareHolders = shareHolders;
    this.womenFarmerPercentage = womenFarmerPercentage;
  }
}
