import RecordModel from '../config/sequelize.js';
import ErrorResponce from '../middlewares/errors.js';

export default new (class RecordSevice {
  async getRecords() {
    const records = await RecordModel.findAll();

    if (!records) {
      throw new ErrorResponce('Records not found', 404);
    }

    return records;
  }

  async getRecord(id) {
    const record = await RecordModel.findOne({
      where: { _id: id },
    });

    if (!record) {
      throw new ErrorResponce('Record not found', 404);
    }

    return record;
  }

  async createRecord(title, body) {
    const record = await RecordModel.create({
      title,
      body,
    });

    return record;
  }

  async updateRecord(title, body, id) {
    const record = await RecordModel.update(
      { title, body },
      {
        where: { _id: id },
      }
    ).then(async () => {
      return await RecordModel.findOne({
        where: { _id: id },
      });
    });

    if (!record) {
      throw new ErrorResponce('Record not found', 404);
    }

    return record;
  }

  async deleteRecord(id) {
    const record = await RecordModel.destroy({ where: { _id: id } });

    if (!record) {
      throw new ErrorResponce('Record not found', 404);
    }

    return record;
  }
})();
