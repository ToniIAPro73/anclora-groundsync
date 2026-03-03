import {
  deleteShiftsByIds,
  listShifts,
  upsertShifts,
  validateShiftArray,
  validateShiftIdArray,
} from '../_lib/shifts-store.js';

function sendJson(res, statusCode, payload) {
  res.status(statusCode).setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(payload));
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const shifts = await listShifts();
      return sendJson(res, 200, { shifts });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = req.body ?? {};
      if (!validateShiftArray(payload.shifts)) {
        return sendJson(res, 400, { error: 'Invalid shifts payload' });
      }

      const shifts = await upsertShifts(payload.shifts);
      return sendJson(res, 200, { saved: shifts.length });
    }

    if (req.method === 'PATCH') {
      const payload = req.body ?? {};
      const upserts = payload.upserts ?? [];
      const deleteIds = payload.deleteIds ?? [];

      if (!validateShiftArray(upserts) || !validateShiftIdArray(deleteIds)) {
        return sendJson(res, 400, { error: 'Invalid shift patch payload' });
      }

      const [saved, deleted] = await Promise.all([
        upserts.length > 0 ? upsertShifts(upserts) : Promise.resolve([]),
        deleteIds.length > 0 ? deleteShiftsByIds(deleteIds) : Promise.resolve(0),
      ]);

      return sendJson(res, 200, {
        saved: saved.length,
        deleted,
      });
    }

    res.setHeader('Allow', 'GET, POST, PUT, PATCH');
    return sendJson(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('[api/shifts] error', error);
    return sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Unexpected API error',
    });
  }
}
