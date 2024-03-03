

export interface userData {
  //잠재고객
  //지인코드 등
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  createDate: Date;
  modifyDate: Date;
  deleteDate: Date | null;
}

export interface messageData {
  msgId: string;
  msgText: string;
  createDate: Date;
  modifyDate: Date;
  deleteDate: Date | null;
  attach: attachData[];
}


export interface attachData {
  msgId: string;
  attachId: string;
  attachName: string;
  attachSize: number;
  attachType: string;
  attachPath: string;
}

export interface receiverData {
  receiverId: string;
  receiverName: string;
  relationship: string;
  receiverPhone: string;
}

export interface insuranceData {
  msgId: string;
  insuranceName: string;
  insuranceNumber: string;
}