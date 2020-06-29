import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";

import {SearchResultsComponent} from "./search-results.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "src/environments/environment";
import {ToastrModule} from "ngx-toastr";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {SearchService} from "../shared/search.service";

describe("SearchResultsComponent", () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  let searchService: SearchService;
  let searchServiceSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ToastrModule.forRoot(),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [SearchResultsComponent, SpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    searchService = fixture.debugElement.injector.get(SearchService);
    searchServiceSpy = spyOn(searchService, "setValueToSearch");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize", fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    expect(component.listResults).toBeTruthy();
    expect(component.numberOfResults).toBe(0);
    expect(component.searchValue).toBeTruthy();
    expect(component.showSpinner).toBeTruthy();
  }));
});
