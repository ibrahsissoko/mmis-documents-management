import * as moment from 'moment';
import Knex = require('knex');

export class UploadModel {
  saveUpload(knex: Knex, data: any) {
    return knex('documents')
      .insert(data);
  }

  getFiles(knex: Knex, documentCode: string) {
    return knex('documents')
      .select('document_id', 'document_code', 'file_name', 'file_path', 'uploaded_at')
      .where('document_code', documentCode);
  }

  getFileInfo(knex: Knex, documentId: string) {
    return knex('documents')
      .select('file_path', 'mime_type')
      .where('document_id', documentId);
  }

  removeFile(knex: Knex, documentId: string) {
    return knex('documents')
      .where('document_id', documentId)
      .del();
  }
}
