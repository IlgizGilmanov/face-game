import { Request, Response, NextFunction } from 'express';
import Person from 'models/person';

export class PersonRoute {
  public personRoute(app): void {
    // Create Person
    app.route('/api/create-person').post((req: Request, res: Response, next: NextFunction) => {
      Person.create(req.body, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
    });

    // Get All Persons
    app.route('/api/get-persons').get((req: Request, res: Response, next: NextFunction) => {
      Person.find((error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
    });

    // Get Single Person
    app.route('/api/get-person/:id').get((req: Request, res: Response, next: NextFunction) => {
      Person.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
    });

    // Update Person
    app.route('/api/update-person/:id').put((req: Request, res: Response, next: NextFunction) => {
      Person.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
            console.log('Data updated successfully');
          }
        },
      );
    });

    // Delete Person
    app.route('/api/delete-person/:id').delete((req: Request, res: Response, next: NextFunction) => {
      Person.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data,
          });
        }
      });
    });
  }
}
