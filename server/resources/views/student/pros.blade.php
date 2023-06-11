@extends('top.app')
@include('top.topnav')
@section('content')
    <div class="container">
        <div class="main-body">
            <br><br><br>
            <div class="row gutters-sm">
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
                                    class="rounded-circle" width="150">
                                <div class="mt-3">
                                    <h4>{{ session()->get('profile')->name }}</h4>
                                    <p class="text-secondary mb-1">Student</p>
                                    <p class="text-muted font-size-sm">{{ session()->get('profile')->adress }}</p>
                                    <a href="{{ session()->get('profile')->email }}" class="btn btn-outline-primary">Message</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Full Name</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{ session()->get('profile')->name }}
                                </div>
                            </div>
                            <hr>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Age</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{ session()->get('profile')->age }}
                                </div>
                            </div>
                            <hr>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Gender</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{ session()->get('profile')->gender }}
                                </div>
                            </div>
                            <hr>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{ session()->get('profile')->email }}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Phone</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{ session()->get('profile')->phone }}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">DOB</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{ session()->get('profile')->dob }}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Address</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {{ session()->get('profile')->address }}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                {{-- <div class="col-sm-12">
                                    <a class="btn btn-info " target="__blank"
                                        href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                </div> --}}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
@stop
