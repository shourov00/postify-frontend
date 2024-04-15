import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {provideRouter} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PhotoService} from "@services/photo/photo.service";
import {ToastrModule, ToastrService} from "ngx-toastr";

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        PhotoService,
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
