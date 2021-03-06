import { LoadTags } from './home.actions';
import { HomeService } from '../home.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class HomeEffects {
	@Effect()
	loadTags = this.actions.ofType<LoadTags>('[home] LOAD_TAGS').pipe(
		switchMap(() =>
			this.homeService.getTags().pipe(
				map(results => ({
					type: '[home] LOAD_TAGS_SUCCESS',
					payload: results.tags
				})),
				catchError(error =>
					of({
						type: '[home] LOAD_TAGS_FAIL',
						payload: error
					})
				)
			)
		)
	);

	constructor(private actions: Actions, private homeService: HomeService) { }
}
