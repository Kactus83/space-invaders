import { Request, Response } from 'express';
import { defaultNavigation, compactNavigation, futuristicNavigation, horizontalNavigation } from '../config/datas';

export class NavigationController {
    public getNavigation(req: Request, res: Response): void {
        const navigation = {
            compact: compactNavigation,
            default: defaultNavigation,
            futuristic: futuristicNavigation,
            horizontal: horizontalNavigation,
        };
        res.status(200).json(navigation);
    }
}