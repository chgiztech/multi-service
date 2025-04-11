import RecordService from '../services/records.service.js';

export default new (class UserController {
  async getRecords(req, res) {
    const records = await RecordService.getRecords();

    res.status(200).json({
      success: true,
      data: records,
    });
  }

  async getRecord(req, res) {
    const id = req.params.id;

    const records = await RecordService.getRecord(id);

    res.status(200).json({
      success: true,
      data: records,
    });
  }

  async createRecord(req, res) {
    const { title, body } = req.body;

    const records = await RecordService.createRecord(title, body);

    res.status(201).json({
      success: true,
      data: records,
    });
  }

  async updateRecord(req, res) {
    const { title, body } = req.body;
    const id = req.params.id;

    const records = await RecordService.updateRecord(title, body, id);

    res.status(201).json({
      success: true,
      data: records,
    });
  }

  async deleteRecord(req, res) {
    const id = req.params.id;

    await RecordService.deleteRecord(id);

    res.status(204).json({
      success: true,
    });
  }
})();
